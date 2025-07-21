<script setup lang="ts">
import { Copy } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useShadowStore } from '~/stores/shadow'
import type { Shadow } from '~/stores/shadow'
import { hexToRgba, copyToClipboard } from '~/utils'
import { toast } from 'vue-sonner'

type PresetShadow = Omit<Shadow, 'id'>

interface Preset {
  title: string
  category: 'material' | 'tailwind'
  shadows: PresetShadow[]
}

interface Props {
  preset: Preset
}

const props = defineProps<Props>()

const shadowStore = useShadowStore()

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

const applyPreset = () => {
  shadowStore.loadPreset(props.preset.shadows)
}

const copyPresetCSS = async () => {
  const css = generatePresetCSS(props.preset.shadows)
  if (css) {
    const success = await copyToClipboard(css)
    if (success) {
      toast.success(`${props.preset.title} CSS copied to clipboard!`)
    }
  }
}
</script>

<template>
  <div
    class="space-y-3 rounded-lg bg-white p-4 transition-all"
    :style="{ boxShadow: getPresetShadowCSS(preset.shadows) }"
    @click="applyPreset"
  >
    <div class="text-sm font-medium">{{ preset.title }}</div>
    <div class="flex gap-2">
      <Button size="sm" variant="secondary" @click.stop="copyPresetCSS">
        <Copy class="h-3 w-3" />
        Copy CSS
      </Button>
      <Button size="sm" @click.stop="applyPreset"> Use </Button>
    </div>
  </div>
</template>
