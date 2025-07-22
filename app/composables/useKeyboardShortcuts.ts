import { useShadowStore } from '~/stores/shadow'

export function useKeyboardShortcuts() {
  const shadowStore = useShadowStore()

  const handleKeyDown = (event: KeyboardEvent) => {
    // Handle Ctrl+Z (or Cmd+Z on Mac)
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key === 'z' &&
      !event.shiftKey
    ) {
      event.preventDefault()
      shadowStore.undo()
      return
    }

    // Handle Shift+Ctrl+Z (or Shift+Cmd+Z on Mac) for redo
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'z') {
      event.preventDefault()
      shadowStore.redo()
      return
    }
  }

  onMounted(() => {
    if (import.meta.client) {
      document.addEventListener('keydown', handleKeyDown)
    }
  })

  onUnmounted(() => {
    if (import.meta.client) {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })
}
