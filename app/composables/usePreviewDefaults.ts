export interface PreviewCardDefaults {
  page: {
    backgroundColor: string
  }
  previewCards: {
    backgroundColor: string
    borderRadius: {
      value: number
      unit: 'rem' | 'px'
      min: number
      max: number
      step: number
    }
    height: {
      value: number
      unit: 'vh' | 'px' | 'rem'
      min: number
      max: number
      step: number
    }
    width: {
      value: number
      unit: 'vw' | 'px' | 'rem'
      min: number
      max: number
      step: number
    }
  }
  view: 'grid' | 'varied'
  numItems: number
}

export const PREVIEW_DEFAULTS: PreviewCardDefaults = {
  page: {
    backgroundColor: '#ffffff',
  },
  previewCards: {
    backgroundColor: '#ffffff',
    borderRadius: {
      value: 0.5,
      unit: 'rem',
      min: 0,
      max: 15,
      step: 0.01,
    },
    height: {
      value: 28,
      unit: 'vh',
      min: 0,
      max: 100,
      step: 0.01,
    },
    width: {
      value: 21,
      unit: 'vw',
      min: 0,
      max: 100,
      step: 1,
    },
  },
  view: 'varied',
  numItems: 3,
}

export const VARIED_VIEW_ITEMS = [
  { type: 'small', width: '10vw', height: '2.5rem' },
  { type: 'medium', width: '10vw', height: '10vw' },
  { type: 'large', width: '20vw', height: '20vw' },
]

export interface PreviewSettings {
  page: {
    backgroundColor: string
  }
  previewCards: {
    backgroundColor: string
    borderRadius: number
    height: number
    width: number
  }
  view: 'grid' | 'varied'
  numItems: number
}

interface ParsedPreviewSettings {
  page?: {
    backgroundColor?: string
  }
  previewCards?: {
    backgroundColor?: string
    borderRadius?: number
    height?: number
    width?: number
  }
  view?: 'grid' | 'varied'
  numItems?: number
}

export function usePreviewDefaults() {
  const getDefaultSettings = (): PreviewSettings => {
    // Fall back to defaults
    return {
      page: {
        backgroundColor: PREVIEW_DEFAULTS.page.backgroundColor,
      },
      previewCards: {
        backgroundColor: PREVIEW_DEFAULTS.previewCards.backgroundColor,
        borderRadius: PREVIEW_DEFAULTS.previewCards.borderRadius.value,
        height: PREVIEW_DEFAULTS.previewCards.height.value,
        width: PREVIEW_DEFAULTS.previewCards.width.value,
      },
      view: PREVIEW_DEFAULTS.view,
      numItems: PREVIEW_DEFAULTS.numItems,
    }
  }

  const getSettingsFromStorage = (): PreviewSettings => {
    // Only try to access localStorage on client side
    if (import.meta.client) {
      try {
        // Try URL first, then localStorage
        const urlSettings = getSettingsFromUrl()
        if (urlSettings) {
          return urlSettings
        }

        const stored = localStorage.getItem('shadows-preview-settings')
        if (stored) {
          const decoded = window.atob(stored)
          const parsedSettings = JSON.parse(decoded)
          // Merge stored settings with defaults to handle any missing properties
          return mergeWithDefaults(parsedSettings)
        }
      } catch (error) {
        console.error('Failed to load preview settings:', error)
      }
    }

    // Fall back to defaults (this ensures consistent behavior on server and client before hydration)
    return getDefaultSettings()
  }

  const getSettingsFromUrl = (): PreviewSettings | null => {
    if (!import.meta.client) return null

    try {
      const params = new URLSearchParams(window.location.search)
      const previewParam = params.get('p')

      if (!previewParam) return null

      const decoded = window.atob(previewParam)
      const parsedSettings = JSON.parse(decoded)
      return mergeWithDefaults(parsedSettings)
    } catch (error) {
      console.error('Failed to load preview settings from URL:', error)
      return null
    }
  }

  const mergeWithDefaults = (
    parsedSettings: ParsedPreviewSettings,
  ): PreviewSettings => {
    return {
      page: {
        backgroundColor:
          parsedSettings?.page?.backgroundColor ||
          PREVIEW_DEFAULTS.page.backgroundColor,
      },
      previewCards: {
        backgroundColor:
          parsedSettings?.previewCards?.backgroundColor ||
          PREVIEW_DEFAULTS.previewCards.backgroundColor,
        borderRadius:
          parsedSettings?.previewCards?.borderRadius ??
          PREVIEW_DEFAULTS.previewCards.borderRadius.value,
        height:
          parsedSettings?.previewCards?.height ??
          PREVIEW_DEFAULTS.previewCards.height.value,
        width:
          parsedSettings?.previewCards?.width ??
          PREVIEW_DEFAULTS.previewCards.width.value,
      },
      view: parsedSettings?.view || PREVIEW_DEFAULTS.view,
      numItems: parsedSettings?.numItems ?? PREVIEW_DEFAULTS.numItems,
    }
  }

  const saveSettingsToStorage = (settings: PreviewSettings): void => {
    if (import.meta.client) {
      try {
        // Save to localStorage with base64 encoding
        const jsonString = JSON.stringify(settings)
        const encoded = window.btoa(jsonString)
        localStorage.setItem('shadows-preview-settings', encoded)

        // Update URL with preview settings
        updateUrlWithPreviewSettings(settings)
      } catch (error) {
        console.error('Failed to save preview settings:', error)
      }
    }
  }

  const updateUrlWithPreviewSettings = (settings: PreviewSettings): void => {
    try {
      const url = new URL(window.location.href)
      const jsonString = JSON.stringify(settings)
      const encoded = window.btoa(jsonString)
      url.searchParams.set('p', encoded)

      // Update URL without triggering navigation
      window.history.replaceState({}, '', url.toString())
    } catch (error) {
      console.error('Failed to update URL with preview settings:', error)
    }
  }

  const formatStyleValue = (
    property: 'borderRadius' | 'height' | 'width',
    value: number,
  ): string => {
    const config = PREVIEW_DEFAULTS.previewCards[property]
    return `${value}${config.unit}`
  }

  const getSliderConfig = (property: 'borderRadius' | 'height' | 'width') => {
    const config = PREVIEW_DEFAULTS.previewCards[property]
    return {
      min: config.min,
      max: config.max,
      step: config.step,
      unit: config.unit,
    }
  }

  return {
    PREVIEW_DEFAULTS,
    VARIED_VIEW_ITEMS,
    formatStyleValue,
    getDefaultSettings,
    getSettingsFromStorage,
    getSettingsFromUrl,
    saveSettingsToStorage,
    updateUrlWithPreviewSettings,
    getSliderConfig,
  }
}
