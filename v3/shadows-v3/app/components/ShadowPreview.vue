<script setup lang="ts">
import { computed } from 'vue'
import { useShadowStore } from '~/stores/shadow'
import { hexToRgba } from '~/utils'

const shadowStore = useShadowStore()

const shadowCSS = computed(() => {
  const visibleShadows = shadowStore.visibleShadows
  if (visibleShadows.length === 0) return 'none'

  return visibleShadows
    .map(shadow => {
      const rgba = hexToRgba(shadow.color, shadow.opacity)
      return `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${rgba}`
    })
    .join(', ')
})

const backgroundColorWithOpacity = computed(() => {
  return hexToRgba(shadowStore.background.color, shadowStore.background.opacity)
})
</script>
<template>
  <div class="w-full min-h-[400px] p-8 rounded-lg" :style="{ backgroundColor: backgroundColorWithOpacity }">
    <div class="flex flex-wrap gap-8 items-center justify-center">
      <!-- Small preview box -->
      <div
        class="w-24 h-24 bg-white rounded-lg"
        :style="{ boxShadow: shadowCSS }"
      />

      <!-- Medium preview box -->
      <div
        class="w-32 h-32 bg-white rounded-lg"
        :style="{ boxShadow: shadowCSS }"
      />

      <!-- Large preview box -->
      <div
        class="w-40 h-40 bg-white rounded-lg"
        :style="{ boxShadow: shadowCSS }"
      />

      <!-- Card-like preview -->
      <div
        class="w-48 h-32 bg-white rounded-lg flex items-center justify-center text-gray-600"
        :style="{ boxShadow: shadowCSS }"
      >
        <span class="text-sm">Preview Card</span>
      </div>
    </div>
  </div>
</template>
