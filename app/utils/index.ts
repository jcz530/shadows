import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Shadow } from '~/stores/shadow'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Color conversion utilities from original project
export function hexToRgba(hex: string, opacity: number): string {
  hex = hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (m, r, g, b) => '#' + r + r + g + g + b + b,
  )
  const result = hex
    .substring(1)
    .match(/.{2}/g)
    ?.map(x => parseInt(x, 16))

  if (!result) return `rgba(0, 0, 0, ${opacity / 100})`

  const alpha = opacity / 100
  return `rgba(${result[0]}, ${result[1]}, ${result[2]}, ${alpha})`
}

// Trigonometry utilities from original project
export function xAndYFromAngleDistance(
  angle: number,
  distance: number,
): { x: number; y: number } {
  const radians = (angle * Math.PI) / 180
  return {
    x: Math.round(Math.sin(radians) * distance),
    y: Math.round(Math.cos(radians) * distance),
  }
}

// Clipboard utility
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy: ', err)
    return false
  }
}

interface ShadowData {
  shadows: Shadow[]
  background: {
    color: string
    opacity: number
  }
}

// Simple CSS-based URL encoding - just use the box-shadow values directly
export function encodeShadowsToUrl(
  shadows: Shadow[],
  background: { color: string; opacity: number },
): string {
  try {
    const visibleShadows = shadows.filter(shadow => shadow.visible)
    if (visibleShadows.length === 0) return ''

    // Create CSS box-shadow string
    const shadowValues = visibleShadows
      .map(shadow => {
        const xy = xAndYFromAngleDistance(shadow.angle, shadow.distance)
        return `${xy.x}px ${xy.y}px ${shadow.blur}px ${shadow.spread}px ${hexToRgba(shadow.color, shadow.opacity)}`
      })
      .join(',')

    // Manually build query string to control encoding
    const params: string[] = []
    params.push(`s=${encodeURIComponent(shadowValues)}`)

    if (background.color !== '#ffffff' || background.opacity !== 100) {
      params.push(
        `bg=${encodeURIComponent(`${background.color}:${background.opacity}`)}`,
      )
    }

    return params.join('&')
  } catch (err) {
    console.error('Failed to encode shadows to URL:', err)
    return ''
  }
}

interface DecodeResult {
  success: boolean
  data?: ShadowData
  error?: string
}

export function decodeShadowsFromUrl(encoded: string): DecodeResult {
  try {
    // Always use URLSearchParams to handle decoding properly
    const params = new URLSearchParams(encoded)
    let shadowValues = params.get('s')
    let bgParam = params.get('bg')

    // Double-decode if needed (sometimes values get double-encoded)
    if (shadowValues && shadowValues.includes('%')) {
      try {
        shadowValues = decodeURIComponent(shadowValues)
      } catch {
        // If decoding fails, use the original value
      }
    }

    if (bgParam && bgParam.includes('%')) {
      try {
        bgParam = decodeURIComponent(bgParam)
      } catch {
        // If decoding fails, use the original value
      }
    }

    if (!shadowValues) {
      return { success: false, error: 'No shadow data found in URL' }
    }

    // Parse background
    let background = { color: '#ffffff', opacity: 100 }
    if (bgParam) {
      const [color, opacity] = bgParam.split(':')
      background = {
        color: color || '#ffffff',
        opacity: opacity ? parseInt(opacity) : 100,
      }
    }

    // Parse shadow values - handle multiple shadows separated by comma
    // But be careful with commas inside rgba() values
    const shadows: Shadow[] = []
    let nextId = 1

    // Split by comma, but rejoin rgba parts
    const parts = shadowValues.split(',')
    const shadowStrings: string[] = []
    let currentShadow = ''
    let inRgba = false

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].trim()
      currentShadow += (currentShadow ? ',' : '') + part

      if (part.includes('rgba(') || part.includes('rgb(')) {
        inRgba = true
      }
      if (inRgba && part.includes(')')) {
        inRgba = false
        shadowStrings.push(currentShadow)
        currentShadow = ''
      } else if (!inRgba && !part.includes('rgba') && !part.includes('rgb')) {
        // This might be a complete shadow without rgba
        if (
          currentShadow.match(/(-?\d+)px\s+(-?\d+)px\s+(\d+)px\s+(-?\d+)px/)
        ) {
          shadowStrings.push(currentShadow)
          currentShadow = ''
        }
      }
    }

    // Add any remaining shadow
    if (currentShadow) {
      shadowStrings.push(currentShadow)
    }

    for (const shadowStr of shadowStrings) {
      // More flexible regex to match different color formats
      const match = shadowStr
        .trim()
        .match(/^(-?\d+)px\s+(-?\d+)px\s+(\d+)px\s+(-?\d+)px\s+(.+)$/)
      if (match) {
        const [, x, y, blur, spread, colorPart] = match

        let color = '#000000'
        let opacity = 100

        // Parse different color formats
        if (colorPart.includes('rgba(') || colorPart.includes('rgb(')) {
          const colorMatch = colorPart.match(/rgba?\(([^)]+)\)/)
          if (colorMatch) {
            const values = colorMatch[1].split(',').map(v => v.trim())
            if (values.length >= 3) {
              const r = parseInt(values[0])
              const g = parseInt(values[1])
              const b = parseInt(values[2])
              const a = values[3] ? parseFloat(values[3]) : 1

              opacity = Math.round(a * 100)
              color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
            }
          }
        } else if (colorPart.startsWith('#')) {
          color = colorPart
        }

        // Calculate angle and distance from x,y
        const xVal = parseInt(x)
        const yVal = parseInt(y)
        const distance = Math.round(Math.sqrt(xVal * xVal + yVal * yVal))
        let angle = Math.round((Math.atan2(xVal, yVal) * 180) / Math.PI)
        if (angle < 0) angle += 360

        shadows.push({
          id: nextId++,
          visible: true,
          angle,
          distance,
          x: xVal,
          y: yVal,
          blur: parseInt(blur),
          spread: parseInt(spread),
          color,
          opacity,
        })
      }
    }

    if (shadows.length === 0) {
      return { success: false, error: 'Could not parse shadow data from URL' }
    }

    return {
      success: true,
      data: { shadows, background },
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error occurred',
    }
  }
}
