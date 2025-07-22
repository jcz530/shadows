<script setup lang="ts">
import { Plus, Copy, Trash2 } from 'lucide-vue-next'
import { useShadowStore } from '~/stores/shadow'
import { copyToClipboard } from '~/utils'
import { Button } from '~/components/ui/button'
import ShadowInputRow from '~/components/ShadowInputRow.vue'
import { CardFooter } from '~/components/ui/card'
import { usePlausible } from '~/composables/usePlausible'
import { toast } from 'vue-sonner'

const shadowStore = useShadowStore()
const { trackEvent } = usePlausible()

const copyCSS = async () => {
  trackEvent('copy_css', { location: 'shadow_builder' })
  const css = shadowStore.cssWithVendorPrefixes
  if (css) {
    const success = await copyToClipboard(css)
    if (success) {
      toast.success('CSS copied to clipboard!')
    }
  }
}

const addShadow = () => {
  trackEvent('add_shadow')
  shadowStore.addShadow()
}

const clearShadows = () => {
  trackEvent('clear_shadows')
  shadowStore.clearShadows()
}
</script>

<template>
  <div class="space-y-4">
    <!-- Header row with labels -->
    <div
      class="grid grid-cols-8 items-center gap-4 border-b bg-muted/50 p-4 text-sm font-medium text-muted-foreground"
    >
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
    <CardFooter>
      <div class="flex gap-3 pt-4">
        <Button @click="addShadow">
          <Plus class="mr-2 h-4 w-4" />
          Add Shadow
        </Button>
        <Button variant="destructive" @click="clearShadows">
          <Trash2 class="mr-2 h-4 w-4" />
          Clear
        </Button>
        <Button variant="outline" @click="copyCSS">
          <Copy class="mr-2 h-4 w-4" />
          Copy CSS
        </Button>
      </div>
    </CardFooter>
  </div>
</template>
