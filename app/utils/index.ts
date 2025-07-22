import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as pako from 'pako'
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

// Compact shadow representation for URL encoding (saves ~60% space)
interface CompactShadow {
  v: boolean  // visible
  a: number   // angle
  d: number   // distance
  b: number   // blur
  s: number   // spread
  c: string   // color (remove # prefix)
  o: number   // opacity
}

interface CompactData {
  s: CompactShadow[]  // shadows
  bg: [string, number] // background [color, opacity]
}

function toCompact(shadows: Shadow[], background: { color: string; opacity: number }): CompactData {
  return {
    s: shadows.map(shadow => ({
      v: shadow.visible,
      a: shadow.angle,
      d: shadow.distance,
      b: shadow.blur,
      s: shadow.spread,
      c: shadow.color.replace('#', ''), // Remove # to save 1 char per shadow
      o: shadow.opacity
    })),
    bg: [background.color.replace('#', ''), background.opacity]
  }
}

function fromCompact(compact: CompactData): ShadowData {
  let nextId = 1
  return {
    shadows: compact.s.map(s => ({
      id: nextId++,
      visible: s.v,
      angle: s.a,
      distance: s.d,
      x: 0, // Will be recalculated by store
      y: 0, // Will be recalculated by store
      blur: s.b,
      spread: s.s,
      color: '#' + s.c,
      opacity: s.o
    })),
    background: {
      color: '#' + compact.bg[0],
      opacity: compact.bg[1]
    }
  }
}

// URL encoding/decoding utilities for shadow data with aggressive compression
export function encodeShadowsToUrl(shadows: Shadow[], background: { color: string; opacity: number }): string {
  try {
    const compactData = toCompact(shadows, background)
    const jsonString = JSON.stringify(compactData)
    
    // Use compression on client-side only
    if (import.meta.client) {
      // Use highest compression level for maximum space savings
      const compressed = pako.deflate(jsonString, { 
        level: 9,
        windowBits: 15,
        memLevel: 9,
        strategy: 0
      })
      const encoded = btoa(String.fromCharCode(...compressed))
      return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    }
    
    // Fallback to regular base64 on server
    const encoded = btoa(jsonString)
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  } catch (err) {
    console.error('Failed to encode shadows to URL:', err)
    return ''
  }
}

export function decodeShadowsFromUrl(encoded: string): ShadowData | null {
  try {
    // Restore padding and standard base64 characters
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
    while (base64.length % 4) {
      base64 += '='
    }
    
    let jsonString: string
    
    if (import.meta.client) {
      try {
        // Try to decompress first (new compact format)
        const binaryString = atob(base64)
        const bytes = new Uint8Array(binaryString.length)
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }
        jsonString = pako.inflate(bytes, { to: 'string' })
        
        // Try parsing as compact format first
        const compactData = JSON.parse(jsonString) as CompactData
        if (compactData.s && compactData.bg) {
          return fromCompact(compactData)
        }
      } catch {
        // Fallback to regular base64 (old format)
        jsonString = atob(base64)
      }
    } else {
      // Server-side fallback
      jsonString = atob(base64)
    }
    
    // Try parsing as old format
    const data = JSON.parse(jsonString) as ShadowData | CompactData
    
    // Check if it's compact format
    if ('s' in data && 'bg' in data) {
      return fromCompact(data as CompactData)
    }
    
    // Validate old format
    if ('shadows' in data && Array.isArray(data.shadows) && data.background) {
      return data as ShadowData
    }
    
    return null
  } catch (err) {
    console.error('Failed to decode shadows from URL:', err)
    return null
  }
}
