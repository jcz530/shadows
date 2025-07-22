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
    // Try to load from localStorage first
    if (import.meta.client) {
      try {
        const stored = localStorage.getItem('shadows-preview-settings')
        if (stored) {
          const parsedSettings = JSON.parse(stored)
          // Merge stored settings with defaults to handle any missing properties
          return {
            page: {
              backgroundColor: parsedSettings.page?.backgroundColor || PREVIEW_DEFAULTS.page.backgroundColor,
            },
            previewCards: {
              backgroundColor: parsedSettings.previewCards?.backgroundColor || PREVIEW_DEFAULTS.previewCards.backgroundColor,
              borderRadius: parsedSettings.previewCards?.borderRadius ?? PREVIEW_DEFAULTS.previewCards.borderRadius.value,
              height: parsedSettings.previewCards?.height ?? PREVIEW_DEFAULTS.previewCards.height.value,
              width: parsedSettings.previewCards?.width ?? PREVIEW_DEFAULTS.previewCards.width.value,
            },
            view: parsedSettings.view || PREVIEW_DEFAULTS.view,
            numItems: parsedSettings.numItems ?? PREVIEW_DEFAULTS.numItems,
          }
        }
      } catch (error) {
        console.error('Failed to load preview settings from localStorage:', error)
      }
    }

    // Fall back to defaults
    return getDefaultSettings()
  }

  const saveSettingsToStorage = (settings: PreviewSettings): void => {
    if (import.meta.client) {
      try {
        localStorage.setItem('shadows-preview-settings', JSON.stringify(settings))
      } catch (error) {
        console.error('Failed to save preview settings to localStorage:', error)
      }
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
    saveSettingsToStorage,
    getSliderConfig,
  }
}
