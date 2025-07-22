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

// Base64 + Pako compression URL encoding
export function encodeShadowsToUrl(
  shadows: Shadow[],
  background: { color: string; opacity: number },
): string {
  try {
    const visibleShadows = shadows.filter(shadow => shadow.visible)
    if (visibleShadows.length === 0) return ''

    // Create data object to compress
    const data = {
      shadows: visibleShadows.map(shadow => ({
        id: shadow.id,
        visible: shadow.visible,
        angle: shadow.angle,
        distance: shadow.distance,
        x: shadow.x,
        y: shadow.y,
        blur: shadow.blur,
        spread: shadow.spread,
        color: shadow.color,
        opacity: shadow.opacity,
      })),
      background,
    }

    // Convert to JSON string
    const jsonString = JSON.stringify(data)

    // Compress using Pako
    const compressed = pako.deflate(jsonString, { level: 9 })

    // Convert to base64
    const base64 = btoa(String.fromCharCode.apply(null, Array.from(compressed)))

    // Make base64 URL-safe by replacing characters
    const urlSafe = base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')

    return `s=${urlSafe}`
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
    const params = new URLSearchParams(encoded)
    const shadowParam = params.get('s')

    if (!shadowParam) {
      return { success: false, error: 'No shadow data found in URL' }
    }

    // Restore base64 from URL-safe format
    let base64 = shadowParam.replace(/-/g, '+').replace(/_/g, '/')

    // Add padding if needed
    while (base64.length % 4) {
      base64 += '='
    }

    // Convert from base64 to binary
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }

    // Decompress using Pako
    const decompressed = pako.inflate(bytes, { to: 'string' })

    // Parse JSON
    const data: ShadowData = JSON.parse(decompressed)

    // Assign new IDs to avoid conflicts
    let nextId = 1
    const shadows = data.shadows.map(shadow => ({
      ...shadow,
      id: nextId++,
      visible: true,
    }))

    return {
      success: true,
      data: {
        shadows,
        background: data.background || { color: '#ffffff', opacity: 100 },
      },
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error occurred',
    }
  }
}

// Base64 encoding utilities for localStorage
export function encryptData(data: string): string {
  try {
    // Simple Base64 encoding with proper UTF-8 handling
    const encoder = new TextEncoder()
    const bytes = encoder.encode(data)
    return btoa(String.fromCharCode(...bytes))
  } catch (error) {
    console.error('Failed to encrypt data:', error)
    throw error
  }
}

export function decryptData(encryptedData: string): string {
  try {
    // Simple Base64 decoding with proper UTF-8 handling
    const binaryString = atob(encryptedData)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    const decoder = new TextDecoder()
    return decoder.decode(bytes)
  } catch (error) {
    console.error('Failed to decrypt data:', error)
    throw error
  }
}

// Local storage utilities for preview settings
const PREVIEW_SETTINGS_KEY = 'shadows-preview-settings'

export function savePreviewSettings(settings: unknown): void {
  try {
    const jsonString = JSON.stringify(settings)
    const encoded = encryptData(jsonString)
    localStorage.setItem(PREVIEW_SETTINGS_KEY, encoded)
  } catch (error) {
    console.error('Failed to save preview settings to localStorage:', error)
  }
}

export function loadPreviewSettings(): unknown | null {
  try {
    const stored = localStorage.getItem(PREVIEW_SETTINGS_KEY)
    if (!stored) return null
    const decoded = decryptData(stored)
    return JSON.parse(decoded)
  } catch (error) {
    console.error('Failed to load preview settings from localStorage:', error)
    return null
  }
}

export function clearPreviewSettings(): void {
  try {
    localStorage.removeItem(PREVIEW_SETTINGS_KEY)
  } catch (error) {
    console.error('Failed to clear preview settings from localStorage:', error)
  }
}

