import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Color conversion utilities from original project
export function hexToRgba(hex: string, opacity: number): string {
  hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
  const result = hex.substring(1).match(/.{2}/g)?.map(x => parseInt(x, 16))
  
  if (!result) return `rgba(0, 0, 0, ${opacity / 100})`
  
  const alpha = opacity / 100
  return `rgba(${result[0]}, ${result[1]}, ${result[2]}, ${alpha})`
}

// Trigonometry utilities from original project
export function xAndYFromAngleDistance(angle: number, distance: number): { x: number; y: number } {
  const radians = (angle * Math.PI) / 180
  return {
    x: Math.round(Math.sin(radians) * distance),
    y: Math.round(Math.cos(radians) * distance)
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