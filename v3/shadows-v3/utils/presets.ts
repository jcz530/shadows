import type { Shadow } from '~/stores/shadow'

type PresetShadow = Omit<Shadow, 'id'>

interface Preset {
  title: string
  category: 'material' | 'tailwind'
  shadows: PresetShadow[]
}

export const materialDesignPresets: Preset[] = [
  {
    title: 'Elevation 1',
    category: 'material',
    shadows: [
      { visible: true, angle: 180, distance: 2, x: 0, y: 2, blur: 1, spread: -1, color: '#000000', opacity: 20 },
      { visible: true, angle: 180, distance: 1, x: 0, y: 1, blur: 1, spread: 0, color: '#000000', opacity: 14 },
      { visible: true, angle: 180, distance: 1, x: 0, y: 1, blur: 3, spread: 0, color: '#000000', opacity: 12 }
    ]
  },
  {
    title: 'Elevation 2',
    category: 'material',
    shadows: [
      { visible: true, angle: 180, distance: 3, x: 0, y: 3, blur: 1, spread: -2, color: '#000000', opacity: 20 },
      { visible: true, angle: 180, distance: 2, x: 0, y: 2, blur: 2, spread: 0, color: '#000000', opacity: 14 },
      { visible: true, angle: 180, distance: 1, x: 0, y: 1, blur: 5, spread: 0, color: '#000000', opacity: 12 }
    ]
  },
  {
    title: 'Elevation 3',
    category: 'material',
    shadows: [
      { visible: true, angle: 180, distance: 3, x: 0, y: 3, blur: 3, spread: -2, color: '#000000', opacity: 20 },
      { visible: true, angle: 180, distance: 3, x: 0, y: 3, blur: 4, spread: 0, color: '#000000', opacity: 14 },
      { visible: true, angle: 180, distance: 1, x: 0, y: 1, blur: 8, spread: 0, color: '#000000', opacity: 12 }
    ]
  },
  {
    title: 'Elevation 4',
    category: 'material',
    shadows: [
      { visible: true, angle: 180, distance: 2, x: 0, y: 2, blur: 4, spread: -1, color: '#000000', opacity: 20 },
      { visible: true, angle: 180, distance: 4, x: 0, y: 4, blur: 5, spread: 0, color: '#000000', opacity: 14 },
      { visible: true, angle: 180, distance: 1, x: 0, y: 1, blur: 10, spread: 0, color: '#000000', opacity: 12 }
    ]
  },
  {
    title: 'Elevation 8',
    category: 'material',
    shadows: [
      { visible: true, angle: 180, distance: 5, x: 0, y: 5, blur: 5, spread: -3, color: '#000000', opacity: 20 },
      { visible: true, angle: 180, distance: 8, x: 0, y: 8, blur: 10, spread: 1, color: '#000000', opacity: 14 },
      { visible: true, angle: 180, distance: 3, x: 0, y: 3, blur: 14, spread: 2, color: '#000000', opacity: 12 }
    ]
  },
  {
    title: 'Elevation 16',
    category: 'material',
    shadows: [
      { visible: true, angle: 180, distance: 8, x: 0, y: 8, blur: 10, spread: -5, color: '#000000', opacity: 20 },
      { visible: true, angle: 180, distance: 16, x: 0, y: 16, blur: 24, spread: 2, color: '#000000', opacity: 14 },
      { visible: true, angle: 180, distance: 6, x: 0, y: 6, blur: 30, spread: 5, color: '#000000', opacity: 12 }
    ]
  },
  {
    title: 'Elevation 24',
    category: 'material',
    shadows: [
      { visible: true, angle: 180, distance: 11, x: 0, y: 11, blur: 15, spread: -7, color: '#000000', opacity: 20 },
      { visible: true, angle: 180, distance: 24, x: 0, y: 24, blur: 38, spread: 3, color: '#000000', opacity: 14 },
      { visible: true, angle: 180, distance: 9, x: 0, y: 9, blur: 46, spread: 8, color: '#000000', opacity: 12 }
    ]
  }
]

export const tailwindPresets: Preset[] = [
  {
    title: 'Small',
    category: 'tailwind',
    shadows: [
      { visible: true, angle: 180, distance: 1, x: 0, y: 1, blur: 2, spread: 0, color: '#000000', opacity: 5 }
    ]
  },
  {
    title: 'Default',
    category: 'tailwind',
    shadows: [
      { visible: true, angle: 180, distance: 1, x: 0, y: 1, blur: 3, spread: 0, color: '#000000', opacity: 10 },
      { visible: true, angle: 180, distance: 1, x: 0, y: 1, blur: 2, spread: 0, color: '#000000', opacity: 6 }
    ]
  },
  {
    title: 'Medium',
    category: 'tailwind',
    shadows: [
      { visible: true, angle: 180, distance: 4, x: 0, y: 4, blur: 6, spread: -1, color: '#000000', opacity: 10 },
      { visible: true, angle: 180, distance: 2, x: 0, y: 2, blur: 4, spread: -1, color: '#000000', opacity: 6 }
    ]
  },
  {
    title: 'Large',
    category: 'tailwind',
    shadows: [
      { visible: true, angle: 180, distance: 10, x: 0, y: 10, blur: 15, spread: -3, color: '#000000', opacity: 10 },
      { visible: true, angle: 180, distance: 4, x: 0, y: 4, blur: 6, spread: -2, color: '#000000', opacity: 5 }
    ]
  },
  {
    title: 'Extra Large',
    category: 'tailwind',
    shadows: [
      { visible: true, angle: 180, distance: 20, x: 0, y: 20, blur: 25, spread: -5, color: '#000000', opacity: 10 },
      { visible: true, angle: 180, distance: 10, x: 0, y: 10, blur: 10, spread: -5, color: '#000000', opacity: 4 }
    ]
  },
  {
    title: '2XL',
    category: 'tailwind',
    shadows: [
      { visible: true, angle: 180, distance: 25, x: 0, y: 25, blur: 50, spread: -12, color: '#000000', opacity: 25 }
    ]
  }
]

export const allPresets = [...materialDesignPresets, ...tailwindPresets]