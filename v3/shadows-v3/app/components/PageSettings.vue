<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-semibold mb-4">Background Settings</h3>
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <label class="text-sm font-medium min-w-[100px]">Background Color:</label>
          <input
            type="color"
            :value="shadowStore.background.color"
            @input="updateBackgroundColor(($event.target as HTMLInputElement).value)"
            class="w-12 h-8 rounded border cursor-pointer"
          />
          <span class="text-sm text-muted-foreground">{{ shadowStore.background.color }}</span>
        </div>
        
        <div class="space-y-2">
          <label class="text-sm font-medium">Background Opacity:</label>
          <div class="flex items-center gap-4">
            <Slider
              :model-value="shadowStore.background.opacity"
              :min="0"
              :max="100"
              @update:model-value="updateBackgroundOpacity"
              class="flex-1"
            />
            <span class="text-sm min-w-[50px]">{{ shadowStore.background.opacity }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3 class="text-lg font-semibold mb-4">Preview Options</h3>
      <div class="text-sm text-muted-foreground">
        Adjust the background color and opacity to better visualize your shadows against different backgrounds.
      </div>
    </div>

    <div>
      <h3 class="text-lg font-semibold mb-4">About</h3>
      <div class="text-sm text-muted-foreground space-y-2">
        <p>This CSS box-shadow generator allows you to create multiple shadow layers and preview them in real-time.</p>
        <p>Built with Vue 3, Nuxt 3, and Tailwind CSS V4.</p>
        <p>Use the presets for quick Material Design or Tailwind CSS shadows.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShadowStore } from '~/stores/shadow'

const shadowStore = useShadowStore()

const updateBackgroundColor = (color: string) => {
  shadowStore.setBackground(color, shadowStore.background.opacity)
}

const updateBackgroundOpacity = (opacity: number) => {
  shadowStore.setBackground(shadowStore.background.color, opacity)
}
</script>