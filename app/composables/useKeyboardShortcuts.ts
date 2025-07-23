import { useShadowStore } from '~/stores/shadow'

export function useKeyboardShortcuts() {
  const shadowStore = useShadowStore()

  const handleKeyDown = async (event: KeyboardEvent) => {
    // Handle Ctrl+Z (or Cmd+Z on Mac)
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key === 'z' &&
      !event.shiftKey
    ) {
      event.preventDefault()
      const result = shadowStore.undo()
      if (result.success) {
        const { toast } = await import('vue-sonner')
        toast.success('Undone: ' + result.title, {
          description: result.description,
        })
      }
      return
    }

    // Handle Shift+Ctrl+Z (or Shift+Cmd+Z on Mac) for redo
    if (
      (event.ctrlKey || event.metaKey) &&
      event.shiftKey &&
      event.key === 'z'
    ) {
      event.preventDefault()
      const result = shadowStore.redo()
      if (result.success) {
        const { toast } = await import('vue-sonner')
        toast.success('Redone: ' + result.title, {
          description: result.description,
        })
      }
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
