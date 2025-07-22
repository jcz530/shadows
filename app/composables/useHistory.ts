import type { Shadow } from '~/stores/shadow'
import { encryptData, decryptData } from '~/utils'

interface HistoryState {
  shadows: Shadow[]
  background: {
    color: string
    opacity: number
  }
  nextId: number
}

interface HistoryManager {
  canUndo: Readonly<Ref<boolean>>
  canRedo: Readonly<Ref<boolean>>
  undoCount: Readonly<Ref<number>>
  redoCount: Readonly<Ref<number>>
  saveState: (state: HistoryState) => void
  undo: () => HistoryState | null
  redo: () => HistoryState | null
  clear: () => void
}

const STORAGE_KEY = 'shadows-history'
const MAX_HISTORY_SIZE = 50

export function useHistory(): HistoryManager {
  const history = ref<HistoryState[]>([])
  const currentIndex = ref(-1)

  const canUndo = computed(() => currentIndex.value > 0)
  const canRedo = computed(() => currentIndex.value < history.value.length - 1)  
  const undoCount = computed(() => Math.max(0, currentIndex.value))
  const redoCount = computed(() =>
    Math.max(0, history.value.length - 1 - currentIndex.value),
  )

  // Load history from localStorage on initialization
  loadFromStorage()

  // Save to localStorage whenever history changes
  watch(
    [history, currentIndex],
    () => {
      saveToStorage()
    },
    { deep: true },
  )

  function loadFromStorage() {
    if (import.meta.client) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
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
          
          history.value = data.history || []
          // Restore the saved currentIndex, or default to end of history if not saved
          currentIndex.value =
            typeof data.currentIndex === 'number'
              ? data.currentIndex
              : history.value.length > 0
                ? history.value.length - 1
                : -1
        }
      } catch (error) {
        console.warn('Failed to load history from localStorage:', error)
        history.value = []
        currentIndex.value = -1
      }
    }
  }

  function saveToStorage() {
    if (import.meta.client) {
      try {
        const dataToSave = {
          history: history.value,
          currentIndex: currentIndex.value,
        }
        
        const jsonString = JSON.stringify(dataToSave)
        const encryptedData = encryptData(jsonString)
        
        localStorage.setItem(STORAGE_KEY, encryptedData)
      } catch (error) {
        console.warn('Failed to save history to localStorage:', error)
      }
    }
  }

  function saveState(state: HistoryState) {
    // Create a deep copy of the state
    const stateCopy: HistoryState = {
      shadows: JSON.parse(JSON.stringify(state.shadows)),
      background: { ...state.background },
      nextId: state.nextId,
    }

    // If we're not at the end of history, remove everything after current position
    if (currentIndex.value < history.value.length - 1) {
      history.value = history.value.slice(0, currentIndex.value + 1)
    }

    // Add the new state
    history.value.push(stateCopy)
    currentIndex.value = history.value.length - 1

    // Limit history size
    if (history.value.length > MAX_HISTORY_SIZE) {
      history.value.shift()
      currentIndex.value = Math.max(0, currentIndex.value - 1)
    }
  }

  function undo(): HistoryState | null {
    if (canUndo.value) {
      currentIndex.value--
      return JSON.parse(JSON.stringify(history.value[currentIndex.value]))
    }
    return null
  }

  function redo(): HistoryState | null {
    if (canRedo.value) {
      currentIndex.value++
      return JSON.parse(JSON.stringify(history.value[currentIndex.value]))
    }
    return null
  }

  function clear() {
    history.value = []
    currentIndex.value = -1
  }

  return {
    canUndo: readonly(canUndo),
    canRedo: readonly(canRedo),
    undoCount: readonly(undoCount),
    redoCount: readonly(redoCount),
    saveState,
    undo,
    redo,
    clear,
  }
}
