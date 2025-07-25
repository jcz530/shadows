<script setup lang="ts">
import { Copy, Plus, Share, Trash2, Undo, Redo } from 'lucide-vue-next'
import { useShadowStore } from '~/stores/shadow'
import { copyToClipboard } from '~/utils'
import { Button } from '~/components/ui/button'
import ShadowInputRow from '~/components/ShadowInputRow.vue'
import { CardFooter } from '~/components/ui/card'
import { useEventTracking } from '~/composables/useEventTracking'
import { toast } from 'vue-sonner'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '~/components/ui/tooltip'

const shadowStore = useShadowStore()
const { trackEvent } = useEventTracking()

const copyCSS = async () => {
  trackEvent('copy_css', { location: 'shadow_builder' })
  const css = shadowStore.cssShadow
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

const copyShareableURL = async () => {
  trackEvent('copy_shareable_url', { location: 'shadow_builder' })
  const currentURL = window.location.href
  const success = await copyToClipboard(currentURL)
  if (success) {
    toast.success('Shareable URL copied to clipboard!')
  }
}

const handleUndo = () => {
  trackEvent('undo')
  const result = shadowStore.undo()
  if (result.success) {
    toast.success('Undone: ' + result.title, {
      description: result.description,
    })
  }
}

const handleRedo = () => {
  trackEvent('redo')
  const result = shadowStore.redo()
  if (result.success) {
    toast.success('Redone: ' + result.title, {
      description: result.description,
    })
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Header row with labels -->
    <div
      class="grid grid-cols-9 items-center gap-4 border-b bg-muted/50 p-4 text-sm font-medium text-muted-foreground"
    >
      <div class="text-center">On/Off</div>
      <div class="text-center">Angle</div>
      <div class="text-center">Distance</div>
      <div class="text-center">Blur</div>
      <div class="text-center">Spread</div>
      <div class="text-center">Color</div>
      <div class="text-center">Inset</div>
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
      <div class="flex flex-wrap gap-3 pt-4">
        <!-- First row: Undo/Redo buttons -->
        <div class="flex w-full gap-3 sm:w-auto">
          <ClientOnly>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button
                    variant="outline"
                    :disabled="!shadowStore.canUndo"
                    class="relative"
                    @click="handleUndo"
                  >
                    <Undo class="mr-2 h-4 w-4" />
                    Undo
                    <span
                      v-show="shadowStore.undoCount > 0"
                      class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-purple-400 text-xs font-medium text-white"
                    >
                      {{ shadowStore.undoCount }}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent> Undo (Ctrl+Z) </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger as-child>
                  <Button
                    variant="outline"
                    :disabled="!shadowStore.canRedo"
                    class="relative"
                    @click="handleRedo"
                  >
                    <Redo class="mr-2 h-4 w-4" />
                    Redo
                    <span
                      v-show="shadowStore.redoCount > 0"
                      class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-purple-400 text-xs font-medium text-white"
                    >
                      {{ shadowStore.redoCount }}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent> Redo (Shift+Ctrl+Z) </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </ClientOnly>
        </div>

        <!-- Divider -->
        <div class="hidden h-8 w-px bg-border sm:block"></div>

        <!-- Second row: Main action buttons -->
        <div class="flex w-full flex-wrap gap-3 sm:w-auto">
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
          <Button variant="outline" @click="copyShareableURL">
            <Share class="mr-2 h-4 w-4" />
            Copy shareable URL
          </Button>
        </div>
      </div>
    </CardFooter>
  </div>
</template>
