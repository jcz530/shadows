<template>
  <div class="space-y-4">
    <!-- Header row with labels -->
    <div class="grid grid-cols-8 gap-4 items-center p-4 text-sm font-medium text-muted-foreground border-b bg-muted/50">
      <div class="text-center">On/Off</div>
      <div class="text-center">Angle</div>
      <div class="text-center">Distance</div>
      <div class="text-center">Blur</div>
      <div class="text-center">Spread</div>
      <div class="text-center">Color</div>
      <div class="text-center">Opacity</div>
      <div class="text-center">Actions</div>
    </div>

    <!-- Shadow input rows -->
    <div class="space-y-0">
      <ShadowInputRow
        v-for="shadow in shadowStore.shadows"
        :key="shadow.id"
        :shadow="shadow"
        @duplicate="shadowStore.duplicateShadow(shadow)"
        @delete="shadowStore.deleteShadow(shadow.id)"
      />
    </div>

    <!-- Action buttons -->
    <div class="flex gap-3 pt-4">
      <Button @click="shadowStore.addShadow()">
        <Plus class="w-4 h-4 mr-2" />
        Add Shadow
      </Button>
      <Button variant="destructive" @click="shadowStore.clearShadows()">
        <Trash2 class="w-4 h-4 mr-2" />
        Clear
      </Button>
      <Button variant="outline" @click="copyCSS">
        <Copy class="w-4 h-4 mr-2" />
        Copy CSS
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Copy, Trash2 } from 'lucide-vue-next'
import { useShadowStore } from '~/stores/shadow'
import { copyToClipboard } from '~/utils'
import { useToast } from '@vueuse/core'

const shadowStore = useShadowStore()

const copyCSS = async () => {
  const css = shadowStore.cssWithVendorPrefixes
  if (css) {
    const success = await copyToClipboard(css)
    if (success) {
      // You could add a toast notification here
      console.log('CSS copied to clipboard!')
    }
  }
}
</script>