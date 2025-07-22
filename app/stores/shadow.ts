import { defineStore } from 'pinia'
import { hexToRgba, xAndYFromAngleDistance, encodeShadowsToUrl, decodeShadowsFromUrl } from '~/utils'

export interface Shadow {
  id: number
  visible: boolean
  angle: number
  distance: number
  x: number
  y: number
  blur: number
  spread: number
  color: string
  opacity: number
}

interface ShadowState {
  shadows: Shadow[]
  nextId: number
  background: {
    color: string
    opacity: number
  }
}

export const useShadowStore = defineStore('shadow', {
  state: (): ShadowState => ({
    shadows: [
      {
        id: 1,
        visible: true,
        angle: 90,
        distance: 8,
        x: 0,
        y: 8,
        blur: 6,
        spread: 3,
        color: '#000000',
        opacity: 20,
      },
    ],
    nextId: 2,
    background: {
      color: '#ffffff',
      opacity: 100,
    },
  }),

  getters: {
    visibleShadows: state => state.shadows.filter(shadow => shadow.visible),

    cssShadow: state => {
      const visibleShadows = state.shadows.filter(shadow => shadow.visible)
      if (visibleShadows.length === 0) return ''

      let css = 'box-shadow: '
      visibleShadows.forEach((shadow, index) => {
        const xy = xAndYFromAngleDistance(shadow.angle, shadow.distance)
        css += `${xy.x}px ${xy.y}px ${shadow.blur}px ${shadow.spread}px ${hexToRgba(shadow.color, shadow.opacity)}`
        if (index < visibleShadows.length - 1) {
          css += ', '
        }
      })
      css += ';'

      return css
    },

    cssWithVendorPrefixes(): string {
      const baseCss = this.cssShadow
      if (!baseCss) return ''

      return `${baseCss}\n-webkit-${baseCss}\n-moz-${baseCss}`
    },
  },

  actions: {
    addShadow() {
      const newShadow: Shadow = {
        id: this.nextId++,
        visible: true,
        angle: 90,
        distance: 8,
        x: 0,
        y: 8,
        blur: 6,
        spread: 3,
        color: '#000000',
        opacity: 20,
      }
      this.shadows.push(newShadow)
      this.syncToUrl()
    },

    duplicateShadow(shadow: Shadow) {
      const duplicated: Shadow = {
        ...shadow,
        id: this.nextId++,
      }
      this.shadows.push(duplicated)
      this.syncToUrl()
    },

    deleteShadow(shadowId: number) {
      this.shadows = this.shadows.filter(s => s.id !== shadowId)
      this.syncToUrl()
    },

    clearShadows() {
      this.shadows = []
      this.syncToUrl()
    },

    toggleShadowVisibility(shadowId: number) {
      const shadow = this.shadows.find(s => s.id === shadowId)
      if (shadow) {
        shadow.visible = !shadow.visible
        this.syncToUrl()
      }
    },

    updateShadowField(shadowId: number, field: keyof Shadow, value: unknown) {
      const shadow = this.shadows.find(s => s.id === shadowId)
      if (shadow) {
        ;(shadow as Record<string, unknown>)[field] = value

        // Update x,y coordinates when angle or distance changes
        if (field === 'angle' || field === 'distance') {
          const xy = xAndYFromAngleDistance(shadow.angle, shadow.distance)
          shadow.x = xy.x
          shadow.y = xy.y
        }
        this.syncToUrl()
      }
    },

    setBackground(color: string, opacity: number = 100) {
      this.background.color = color
      this.background.opacity = opacity
      this.syncToUrl()
    },

    loadPreset(shadows: Omit<Shadow, 'id'>[]) {
      this.shadows = shadows.map(shadow => ({
        ...shadow,
        id: this.nextId++,
      }))
      this.syncToUrl()
    },

    syncToUrl() {
      if (import.meta.client) {
        const encoded = encodeShadowsToUrl(this.shadows, this.background)
        if (encoded) {
          const url = new URL(window.location.href)
          url.searchParams.set('data', encoded)
          window.history.replaceState({}, '', url.toString())
        }
      }
    },

    loadFromUrl() {
      if (import.meta.client) {
        const url = new URL(window.location.href)
        const encoded = url.searchParams.get('data')
        if (encoded) {
          const decoded = decodeShadowsFromUrl(encoded)
          if (decoded) {
            this.shadows = decoded.shadows.map(shadow => ({
              ...shadow,
              id: this.nextId++,
            }))
            this.background = decoded.background
            return true
          }
        }
      }
      return false
    },
  },
})
