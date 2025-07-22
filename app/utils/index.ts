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

// URL encoding/decoding utilities for shadow data with compression
export function encodeShadowsToUrl(shadows: Shadow[], background: { color: string; opacity: number }): string {
  try {
    const data: ShadowData = { shadows, background }
    const jsonString = JSON.stringify(data)
    
    // Use compression on client-side only
    if (import.meta.client) {
      const compressed = pako.deflate(jsonString, { to: 'string' })
      const encoded = btoa(compressed)
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
        // Try to decompress first (new format)
        const compressed = atob(base64)
        jsonString = pako.inflate(compressed, { to: 'string' })
      } catch {
        // Fallback to regular base64 (old format)
        jsonString = atob(base64)
      }
    } else {
      // Server-side fallback
      jsonString = atob(base64)
    }
    
    const data = JSON.parse(jsonString) as ShadowData
    
    // Validate the data structure
    if (data && Array.isArray(data.shadows) && data.background) {
      return data
    }
    
    return null
  } catch (err) {
    console.error('Failed to decode shadows from URL:', err)
    return null
  }
}
