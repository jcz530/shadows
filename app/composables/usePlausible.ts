export const usePlausible = () => {
  const trackEvent = (
    eventName: string,
    props?: Record<string, string | number>,
  ) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(eventName, { props })
    }
  }

  return {
    trackEvent,
  }
}

declare global {
  interface Window {
    plausible: (
      event: string,
      options?: { props?: Record<string, string | number> },
    ) => void
  }
}
