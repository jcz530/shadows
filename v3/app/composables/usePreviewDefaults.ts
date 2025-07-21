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
      grid: {
        value: number
        unit: 'vh' | 'px' | 'rem'
      }
      varied: {
        value: number
        unit: 'vh' | 'px' | 'rem'
      }
      min: number
      max: number
      step: number
    }
    width: {
      grid: {
        value: number
        unit: 'vw' | 'px' | 'rem'
      }
      varied: {
        value: number
        unit: 'vw' | 'px' | 'rem'
      }
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
      max: 2,
      step: 0.01,
    },
    height: {
      grid: {
        value: 18,
        unit: 'vh',
      },
      varied: {
        value: 25,
        unit: 'vh',
      },
      min: 0,
      max: 100,
      step: 0.01,
    },
    width: {
      grid: {
        value: 18,
        unit: 'vw',
      },
      varied: {
        value: 25,
        unit: 'vw',
      },
      min: 0,
      max: 100,
      step: 1,
    },
  },
  view: 'varied',
  numItems: 3,
}

export const VARIED_VIEW_ITEMS = [
  { type: 'small', width: '6rem', height: '2.5rem' },
  { type: 'medium', width: '10rem', height: '10rem' },
  { type: 'large', width: '20rem', height: '20rem' },
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
    const defaultView = PREVIEW_DEFAULTS.view
    return {
      page: {
        backgroundColor: PREVIEW_DEFAULTS.page.backgroundColor,
      },
      previewCards: {
        backgroundColor: PREVIEW_DEFAULTS.previewCards.backgroundColor,
        borderRadius: PREVIEW_DEFAULTS.previewCards.borderRadius.value,
        height: PREVIEW_DEFAULTS.previewCards.height[defaultView].value,
        width: PREVIEW_DEFAULTS.previewCards.width[defaultView].value,
      },
      view: defaultView,
      numItems: PREVIEW_DEFAULTS.numItems,
    }
  }

  const formatStyleValue = (
    property: 'borderRadius' | 'height' | 'width',
    value: number,
    view: 'grid' | 'varied' = 'varied'
  ): string => {
    if (property === 'borderRadius') {
      const config = PREVIEW_DEFAULTS.previewCards.borderRadius
      return `${value}${config.unit}`
    }

    const config = PREVIEW_DEFAULTS.previewCards[property][view]
    return `${value}${config.unit}`
  }

  const getSliderConfig = (property: 'borderRadius' | 'height' | 'width') => {
    const config = PREVIEW_DEFAULTS.previewCards[property]
    if (property === 'borderRadius') {
      return {
        min: config.min,
        max: config.max,
        step: config.step,
        unit: config.unit,
      }
    }

    return {
      min: config.min,
      max: config.max,
      step: config.step,
      unit: config.grid.unit, // Use grid unit as default for sliders
    }
  }

  const getViewSpecificDefaults = (view: 'grid' | 'varied') => ({
    height: PREVIEW_DEFAULTS.previewCards.height[view].value,
    width: PREVIEW_DEFAULTS.previewCards.width[view].value,
  })

  return {
    PREVIEW_DEFAULTS,
    VARIED_VIEW_ITEMS,
    formatStyleValue,
    getDefaultSettings,
    getSliderConfig,
    getViewSpecificDefaults,
  }
}
