<script setup lang="ts">
import { Copy } from 'lucide-vue-next'
import { useShadowStore } from '~/stores/shadow'
import { materialDesignPresets, tailwindPresets } from '~/utils/presets'
import type { Shadow } from '~/stores/shadow'
import { hexToRgba, copyToClipboard } from '~/utils'

const shadowStore = useShadowStore()

type PresetShadow = Omit<Shadow, 'id'>

interface Preset {
  title: string
  category: 'material' | 'tailwind'
  shadows: PresetShadow[]
}

const materialPresets = materialDesignPresets
const tailwindPresets = tailwindPresets

const getPresetShadowCSS = (shadows: PresetShadow[]): string => {
  return shadows
    .filter(shadow => shadow.visible)
    .map(shadow => {
      const rgba = hexToRgba(shadow.color, shadow.opacity)
      return `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${rgba}`
    })
    .join(', ')
}

const generatePresetCSS = (shadows: PresetShadow[]): string => {
  const shadowCSS = getPresetShadowCSS(shadows)
  if (!shadowCSS) return ''

  const baseCss = `box-shadow: ${shadowCSS};`
  return `${baseCss}\n-webkit-${baseCss}\n-moz-${baseCss}`
}

const applyPreset = (preset: Preset) => {
  shadowStore.loadPreset(preset.shadows)
}

const copyPresetCSS = async (preset: Preset) => {
  const css = generatePresetCSS(preset.shadows)
  if (css) {
    const success = await copyToClipboard(css)
    if (success) {
      console.log(`${preset.title} CSS copied to clipboard!`)
    }
  }
}
</script>
<template>
  <div class="space-y-6">
    <!-- Material Design Presets -->
    <div>
      <h3 class="mb-4 text-lg font-semibold">Material Design</h3>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div
          v-for="preset in materialPresets"
          :key="preset.title"
          class="cursor-pointer space-y-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
          @click="applyPreset(preset)"
        >
          <div class="text-sm font-medium">{{ preset.title }}</div>
          <div
            class="flex h-16 w-full items-center justify-center rounded border bg-white text-xs text-gray-500"
            :style="{ boxShadow: getPresetShadowCSS(preset.shadows) }"
          >
            Preview
          </div>
          <div class="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              @click.stop="copyPresetCSS(preset)"
            >
              <Copy class="h-3 w-3" />
            </Button>
            <Button size="sm" @click.stop="applyPreset(preset)"> Use </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tailwind Presets -->
    <div>
      <h3 class="mb-4 text-lg font-semibold">Tailwind CSS</h3>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div
          v-for="preset in tailwindPresets"
          :key="preset.title"
          class="cursor-pointer space-y-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
          @click="applyPreset(preset)"
        >
          <div class="text-sm font-medium">{{ preset.title }}</div>
          <div
            class="flex h-16 w-full items-center justify-center rounded border bg-white text-xs text-gray-500"
            :style="{ boxShadow: getPresetShadowCSS(preset.shadows) }"
          >
            Preview
          </div>
          <div class="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              @click.stop="copyPresetCSS(preset)"
            >
              <Copy class="h-3 w-3" />
            </Button>
            <Button size="sm" @click.stop="applyPreset(preset)"> Use </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
