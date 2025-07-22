import { defineStore } from 'pinia'
import {
  hexToRgba,
  xAndYFromAngleDistance,
  encodeShadowsToUrl,
  decodeShadowsFromUrl,
} from '~/utils'
import { useHistory } from '~/composables/useHistory'

// Module-level history instance
let historyInstance: ReturnType<typeof useHistory> | null = null

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
  isUndoRedo: boolean
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
    isUndoRedo: false,
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

    canUndo(): boolean {
      // Initialize history if needed
      if (!historyInstance) {
        historyInstance = useHistory()
      }
      return historyInstance.canUndo.value
    },

    canRedo(): boolean {
      // Initialize history if needed
      if (!historyInstance) {
        historyInstance = useHistory()
      }
      return historyInstance.canRedo.value
    },
  },

  actions: {
    _getHistory() {
      if (!historyInstance) {
        historyInstance = useHistory()
      }
      return historyInstance
    },

    _saveToHistory() {
      if (!this.isUndoRedo) {
        this._getHistory().saveState({
          shadows: JSON.parse(JSON.stringify(this.shadows)),
          background: { ...this.background },
          nextId: this.nextId,
        })
      }
    },

    _restoreFromHistory(state: {
      shadows: Shadow[]
      background: { color: string; opacity: number }
      nextId: number
    }) {
      this.isUndoRedo = true
      this.shadows = state.shadows
      this.background = state.background
      this.nextId = state.nextId
      this.syncToUrl()
      this.isUndoRedo = false
    },

    undo() {
      const state = this._getHistory().undo()
      if (state) {
        this._restoreFromHistory(state)
        return true
      }
      return false
    },

    redo() {
      const state = this._getHistory().redo()
      if (state) {
        this._restoreFromHistory(state)
        return true
      }
      return false
    },

    clearHistory() {
      this._getHistory().clear()
    },
    addShadow() {
      this._saveToHistory()
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
      this._saveToHistory()
      const duplicated: Shadow = {
        ...shadow,
        id: this.nextId++,
      }
      this.shadows.push(duplicated)
      this.syncToUrl()
    },

    deleteShadow(shadowId: number) {
      this._saveToHistory()
      this.shadows = this.shadows.filter(s => s.id !== shadowId)
      this.syncToUrl()
    },

    clearShadows() {
      this._saveToHistory()
      this.shadows = []
      this.syncToUrl()
    },

    toggleShadowVisibility(shadowId: number) {
      this._saveToHistory()
      const shadow = this.shadows.find(s => s.id === shadowId)
      if (shadow) {
        shadow.visible = !shadow.visible
        this.syncToUrl()
      }
    },

    updateShadowField(shadowId: number, field: keyof Shadow, value: unknown) {
      this._saveToHistory()
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
      this._saveToHistory()
      this.background.color = color
      this.background.opacity = opacity
      this.syncToUrl()
    },

    loadPreset(shadows: Omit<Shadow, 'id'>[]) {
      this._saveToHistory()
      this.shadows = shadows.map(shadow => ({
        ...shadow,
        id: this.nextId++,
      }))
      this.syncToUrl()
    },

    syncToUrl() {
      if (import.meta.client) {
        const encoded = encodeShadowsToUrl(this.shadows, this.background)
        const url = new URL(window.location.href)

        if (encoded) {
          // Replace the entire query string with our encoded parameters
          url.search = encoded
        } else {
          // Clear parameters if no shadows
          url.search = ''
        }

        window.history.replaceState({}, '', url.toString())
      }
    },

    async loadFromUrl() {
      if (import.meta.client) {
        const queryString = window.location.search.substring(1) // Remove the '?'
        if (queryString) {
          const result = decodeShadowsFromUrl(queryString)
          if (result.success && result.data) {
            this.shadows = result.data.shadows.map(shadow => ({
              ...shadow,
              id: this.nextId++,
            }))
            this.background = result.data.background

            // Show success toast
            const { toast } = await import('vue-sonner')
            toast.success('Loaded shadows from URL', {
              description: `Successfully loaded ${result.data.shadows.length} shadow${result.data.shadows.length === 1 ? '' : 's'} from URL`,
            })
            return true
          } else if (result.error) {
            // Show error toast
            const { toast } = await import('vue-sonner')
            toast.error('Failed to load shadows from URL', {
              description: result.error,
            })
          }
        }
      }
      return false
    },
  },
})
