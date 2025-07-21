<script setup lang="ts">
import { computed } from 'vue'
import { useShadowStore } from '~/stores/shadow'
import { hexToRgba } from '~/utils'
import { usePreviewDefaults, type PreviewSettings } from '~/composables/usePreviewDefaults'

const { formatStyleValue } = usePreviewDefaults()

const props = defineProps<{
  settings?: PreviewSettings
}>()

const shadowStore = useShadowStore()

const shadowCSS = computed(() => {
  const visibleShadows = shadowStore.visibleShadows
  if (visibleShadows.length === 0) return 'none'

  return visibleShadows
    .map((shadow) => {
      const rgba = hexToRgba(shadow.color, shadow.opacity)
      return `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${rgba}`
    })
    .join(', ')
})

const backgroundColorWithOpacity = computed(() => {
  if (props.settings?.page.backgroundColor) {
    return props.settings.page.backgroundColor
  }
  return hexToRgba(shadowStore.background.color, shadowStore.background.opacity)
})

const cardStyles = computed(() => {
  if (!props.settings) {
    return {
      backgroundColor: '#ffffff',
      borderRadius: formatStyleValue('borderRadius', 0.5),
      height: formatStyleValue('height', 21),
      width: formatStyleValue('width', 28),
    }
  }

  return {
    backgroundColor: props.settings.previewCards.backgroundColor,
    borderRadius: formatStyleValue('borderRadius', props.settings.previewCards.borderRadius),
    height: formatStyleValue('height', props.settings.previewCards.height),
    width: formatStyleValue('width', props.settings.previewCards.width),
  }
})

const containerClass = computed(() => {
  if (props.settings?.view === 'varied') {
    return 'flex gap-8 items-center justify-center'
  }
  return 'flex flex-wrap gap-8 items-center justify-center'
})

const previewItems = computed(() => {
  if (props.settings?.view === 'varied') {
    // For varied view, return specific items with their sizes
    return [
      { type: 'button', width: '100px', height: '40px' },
      { type: 'medium', width: '120px', height: '120px' },
      { type: 'large', width: '160px', height: '160px' },
    ]
  }

  const count = props.settings?.numItems || 4
  return Array.from({ length: count }, (_, i) => ({
    type: 'standard',
    index: i,
  }))
})

const getItemStyles = (item: any) => {
  if (props.settings?.view === 'varied' && item.type) {
    return {
      backgroundColor: props.settings.previewCards.backgroundColor,
      borderRadius: formatStyleValue('borderRadius', props.settings.previewCards.borderRadius),
      height: item.height,
      width: item.width,
      boxShadow: shadowCSS.value,
    }
  }

  return {
    ...cardStyles.value,
    boxShadow: shadowCSS.value,
  }
}
</script>
<template>
  <div
    class="w-full min-h-[400px] p-8 rounded-lg"
    :style="{ backgroundColor: backgroundColorWithOpacity }"
  >
    <div :class="containerClass">
      <div
        v-for="(item, index) in previewItems"
        :key="index"
        :style="getItemStyles(item)"
      />
    </div>
  </div>
</template>
