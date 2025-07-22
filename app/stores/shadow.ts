import { defineStore } from 'pinia'
import { nextTick } from 'vue'
import {
  hexToRgba,
  xAndYFromAngleDistance,
  encodeShadowsToUrl,
  decodeShadowsFromUrl,
  decryptData,
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
  _hasBeenInitializedFromHistory: boolean
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
    _hasBeenInitializedFromHistory: false,
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

    undoCount(): number {
      // Initialize history if needed
      if (!historyInstance) {
        historyInstance = useHistory()
      }
      return historyInstance.undoCount.value
    },

    redoCount(): number {
      // Initialize history if needed
      if (!historyInstance) {
        historyInstance = useHistory()
      }
      return historyInstance.redoCount.value
    },
  },

  actions: {
    async initializeFromHistory() {
      if (!import.meta.client || this._hasBeenInitializedFromHistory)
        return false

      try {
        const stored = localStorage.getItem('shadows-history')
        if (stored) {
          // Try to decrypt the data first
          let data
          try {
            const decryptedData = decryptData(stored)
            data = JSON.parse(decryptedData)
          } catch (decryptError) {
            // If decryption fails, try parsing as unencrypted (for backwards compatibility)
            console.warn('Failed to decrypt history data, trying unencrypted:', decryptError)
            data = JSON.parse(stored)
          }
          const history = data.history || []
          if (history.length > 0) {
            // Get the most recent history entry (end of array)
            const mostRecent = history[history.length - 1]
            if (
              mostRecent &&
              mostRecent.shadows &&
              mostRecent.background &&
              mostRecent.nextId
            ) {
              // Set flag before updating to avoid triggering history saves
              this.isUndoRedo = true
              this._hasBeenInitializedFromHistory = true

              // Restore the state
              this.shadows = mostRecent.shadows
              this.nextId = mostRecent.nextId
              this.background = mostRecent.background

              // Initialize the history manager to ensure it loads properly
              this._getHistory()

              // Sync to URL
              this.syncToUrl()

              // Reset flag
              this.isUndoRedo = false

              // Ensure we have the loaded state as current baseline - no additional save needed

              return true
            }
          }
        }
      } catch (error) {
        console.warn('Failed to initialize from history:', error)
      }

      this._hasBeenInitializedFromHistory = true

      // If we didn't load from history, save initial state as baseline for undo
      nextTick(() => {
        this._saveInitialState()
      })

      return false
    },

    _getHistory() {
      if (!historyInstance) {
        historyInstance = useHistory()
      }
      return historyInstance
    },

    _saveInitialState() {
      // Save the initial state as baseline for undo operations - only if no history exists
      if (import.meta.client) {
        const history = this._getHistory()
        if (history.undoCount.value === 0) {
          history.saveState({
            shadows: JSON.parse(JSON.stringify(this.shadows)),
            background: { ...this.background },
            nextId: this.nextId,
          })
        }
      }
    },

    _saveToHistory() {
      if (!this.isUndoRedo) {
        const stateToSave = {
          shadows: JSON.parse(JSON.stringify(this.shadows)),
          background: { ...this.background },
          nextId: this.nextId,
        }
        this._getHistory().saveState(stateToSave)
      }
    },

    _restoreFromHistory(state: {
      shadows: Shadow[]
      background: { color: string; opacity: number }
      nextId: number
    }) {
      this.isUndoRedo = true

      // Use the saved nextId directly - it should already be correct from when the state was saved
      // Only use calculated value as a safety fallback if the saved nextId seems invalid
      const maxId =
        state.shadows.length > 0 ? Math.max(...state.shadows.map(s => s.id)) : 0
      const minValidNextId = maxId + 1
      const validNextId =
        state.nextId >= minValidNextId ? state.nextId : minValidNextId

      this.shadows = state.shadows
      this.background = state.background
      this.nextId = validNextId
      this.syncToUrl()
      this.isUndoRedo = false
    },

    _describeStateChange(
      oldState: { shadows: Shadow[]; background: any },
      newState: { shadows: Shadow[]; background: any },
    ): { title: string; description: string } {
      const oldShadowCount = oldState.shadows.length
      const newShadowCount = newState.shadows.length

      // Check for shadow count changes
      if (oldShadowCount !== newShadowCount) {
        if (newShadowCount > oldShadowCount) {
          const added = newShadowCount - oldShadowCount
          return {
            title: `Added ${added} shadow${added === 1 ? '' : 's'}`,
            description: `${oldShadowCount} → ${newShadowCount} layers`
          }
        } else {
          const removed = oldShadowCount - newShadowCount
          return {
            title: `Removed ${removed} shadow${removed === 1 ? '' : 's'}`,
            description: `${oldShadowCount} → ${newShadowCount} layers`
          }
        }
      }

      // Check for background changes
      if (oldState.background.color !== newState.background.color) {
        return {
          title: 'Changed background color',
          description: `${oldState.background.color} → ${newState.background.color}`
        }
      }

      if (oldState.background.opacity !== newState.background.opacity) {
        return {
          title: 'Changed background opacity',
          description: `${oldState.background.opacity}% → ${newState.background.opacity}%`
        }
      }

      // Check for shadow visibility changes
      const oldVisibleCount = oldState.shadows.filter(s => s.visible).length
      const newVisibleCount = newState.shadows.filter(s => s.visible).length
      if (oldVisibleCount !== newVisibleCount) {
        if (newVisibleCount > oldVisibleCount) {
          return {
            title: 'Showed shadow layer',
            description: `${oldVisibleCount} → ${newVisibleCount} visible`
          }
        } else {
          return {
            title: 'Hidden shadow layer',
            description: `${oldVisibleCount} → ${newVisibleCount} visible`
          }
        }
      }

      // Check for shadow property changes
      for (
        let i = 0;
        i < Math.min(oldState.shadows.length, newState.shadows.length);
        i++
      ) {
        const oldShadow = oldState.shadows[i]
        const newShadow = newState.shadows[i]

        if (oldShadow.color !== newShadow.color) {
          return {
            title: 'Changed shadow color',
            description: `${oldShadow.color} → ${newShadow.color}`
          }
        }
        if (oldShadow.blur !== newShadow.blur) {
          return {
            title: 'Changed shadow blur',
            description: `${oldShadow.blur}px → ${newShadow.blur}px`
          }
        }
        if (oldShadow.spread !== newShadow.spread) {
          return {
            title: 'Changed shadow spread',
            description: `${oldShadow.spread}px → ${newShadow.spread}px`
          }
        }
        if (oldShadow.opacity !== newShadow.opacity) {
          return {
            title: 'Changed shadow opacity',
            description: `${oldShadow.opacity}% → ${newShadow.opacity}%`
          }
        }
        if (
          oldShadow.angle !== newShadow.angle ||
          oldShadow.distance !== newShadow.distance
        ) {
          return {
            title: 'Changed shadow position',
            description: `${oldShadow.angle}°/${oldShadow.distance}px → ${newShadow.angle}°/${newShadow.distance}px`
          }
        }
      }

      return {
        title: 'Changed shadow properties',
        description: ''
      }
    },

    undo() {
      const currentState = {
        shadows: this.shadows,
        background: this.background,
      }

      const state = this._getHistory().undo()
      if (state) {
        const changeInfo = this._describeStateChange(currentState, state)
        this._restoreFromHistory(state)
        return { 
          success: true, 
          title: changeInfo.title,
          description: changeInfo.description 
        }
      }
      return { success: false }
    },

    redo() {
      const currentState = {
        shadows: this.shadows,
        background: this.background,
      }

      const state = this._getHistory().redo()
      if (state) {
        const changeInfo = this._describeStateChange(currentState, state)
        this._restoreFromHistory(state)
        return { 
          success: true, 
          title: changeInfo.title,
          description: changeInfo.description 
        }
      }
      return { success: false }
    },

    clearHistory() {
      this._getHistory().clear()
    },
    addShadow() {
      // Create new shadow with guaranteed unique ID
      const shadowId = this.nextId
      const newShadow: Shadow = {
        id: shadowId,
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

      // Update nextId and add shadow
      this.nextId = shadowId + 1
      this.shadows.push(newShadow)
      this.syncToUrl()

      // Save the new state after making changes
      this._saveToHistory()
    },

    duplicateShadow(shadow: Shadow) {
      const shadowId = this.nextId
      const duplicated: Shadow = {
        ...shadow,
        id: shadowId,
      }

      this.nextId = shadowId + 1
      this.shadows.push(duplicated)
      this.syncToUrl()

      // Save the new state after making changes
      this._saveToHistory()
    },

    deleteShadow(shadowId: number) {
      this.shadows = this.shadows.filter(s => s.id !== shadowId)
      this.syncToUrl()

      // Save the new state after making changes
      this._saveToHistory()
    },

    clearShadows() {
      this.shadows = []
      this.syncToUrl()

      // Save the new state after making changes
      this._saveToHistory()
    },

    toggleShadowVisibility(shadowId: number) {
      const shadow = this.shadows.find(s => s.id === shadowId)
      if (shadow) {
        shadow.visible = !shadow.visible
        this.syncToUrl()

        // Save the new state after making changes
        this._saveToHistory()
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
        // Note: No history save or URL sync here - only on commit
      }
    },

    commitShadowFieldUpdate() {
      // Only save history if this isn't part of an undo/redo operation
      if (!this.isUndoRedo) {
        this._saveToHistory()
      }
      this.syncToUrl()
    },

    setBackground(color: string, opacity: number = 100) {
      this.background.color = color
      this.background.opacity = opacity
      this.syncToUrl()

      // Save the new state after making changes
      this._saveToHistory()
    },

    loadPreset(shadows: Omit<Shadow, 'id'>[]) {
      let currentId = this.nextId
      this.shadows = shadows.map(shadow => {
        const shadowWithId = {
          ...shadow,
          id: currentId,
        }
        currentId++
        return shadowWithId
      })
      this.nextId = currentId
      this.syncToUrl()

      // Save the new state after making changes
      this._saveToHistory()
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

            // Clear existing history and save URL-loaded state as new baseline
            this.clearHistory()
            nextTick(() => {
              this._saveInitialState()
            })

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
