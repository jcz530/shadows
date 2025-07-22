export const useEventTracking = () => {
  const { $gtag } = useNuxtApp()

  const trackEvent = (
    eventName: string,
    props?: Record<string, string | number>,
  ) => {
    if ($gtag) {
      $gtag('event', eventName, props)
    }
  }

  return {
    trackEvent,
  }
}
