<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Settings } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { Slider } from '~/components/ui/slider'
import { usePreviewDefaults } from '~/composables/usePreviewDefaults'

const { getDefaultSettings, formatStyleValue, getSliderConfig } = usePreviewDefaults()

// Preview settings state
const settings = reactive(getDefaultSettings())

// Color picker refs
const pageColorInput = ref<HTMLInputElement>()
const cardColorInput = ref<HTMLInputElement>()

const emit = defineEmits<{
  settingsChanged: [settings: typeof settings]
}>()

// Watch for changes and emit
const handleSettingsChange = () => {
  emit('settingsChanged', settings)
}

// Handle color changes
const updatePageColor = (event: Event) => {
  const target = event.target as HTMLInputElement
  settings.page.backgroundColor = target.value
  handleSettingsChange()
}

const updateCardColor = (event: Event) => {
  const target = event.target as HTMLInputElement
  settings.previewCards.backgroundColor = target.value
  handleSettingsChange()
}

// Handle slider changes
const updateBorderRadius = (value: number[]) => {
  settings.previewCards.borderRadius = value[0]
  handleSettingsChange()
}

const updateHeight = (value: number[]) => {
  settings.previewCards.height = value[0]
  handleSettingsChange()
}

const updateWidth = (value: number[]) => {
  settings.previewCards.width = value[0]
  handleSettingsChange()
}

const updateNumItems = (value: number[]) => {
  settings.numItems = value[0]
  handleSettingsChange()
}

// View toggle
const toggleView = (view: 'grid' | 'varied') => {
  settings.view = view
  handleSettingsChange()
}
</script>

<template>
  <div class="flex justify-center">
    <Popover>
      <PopoverTrigger as-child>
        <Button variant="outline" size="sm">
          <Settings class="w-4 h-4 mr-2" />
          Adjust Preview Cards
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-96 p-6" side="bottom" align="center">
        <div class="grid grid-cols-2 gap-6">
          <!-- PAGE Column -->
          <div class="space-y-4">
            <h4
              class="font-semibold text-sm uppercase tracking-wide text-muted-foreground"
            >
              PAGE
            </h4>

            <!-- Background Color -->
            <div class="space-y-2">
              <label class="text-sm font-medium">Background Color</label>
              <div class="flex items-center gap-2">
                <Input
                  ref="pageColorInput"
                  type="color"
                  class="hover:cursor-pointer"
                  :value="settings.page.backgroundColor"
                  @input="updatePageColor"
                />
                <Input
                  placeholder="#ffffff"
                  type="text"
                  :value="settings.page.backgroundColor"
                  @input="updatePageColor"
                />
              </div>
            </div>

            <!-- View Toggle -->
            <div class="space-y-2">
              <label class="text-sm font-medium">View</label>
              <div class="flex gap-1">
                <Button
                  variant="outline"
                  @click="toggleView('grid')"
                  :class="[
                    'p-2 rounded border',
                    settings.view === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background hover:bg-accent',
                  ]"
                >
                  <div class="grid grid-cols-2 gap-1 w-8 h-4">
                    <div class="bg-current rounded-[2px]"></div>
                    <div class="bg-current rounded-[2px]"></div>
                    <div class="bg-current rounded-[2px]"></div>
                    <div class="bg-current rounded-[2px]"></div>
                  </div>
                </Button>
                <Button
                  @click="toggleView('varied')"
                  variant="outline"
                  :class="[
                    'p-2 rounded border',
                    settings.view === 'varied'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background hover:bg-accent',
                  ]"
                >
                  <div
                    class="space-x-1 w-8 h-4 flex justify-center items-center"
                  >
                    <div class="bg-current w-2 h-1 rounded-[2px]"></div>
                    <div class="bg-current w-3 h-3 rounded-[2px]"></div>
                    <div class="bg-current w-4 h-4 rounded-[2px]"></div>
                  </div>
                </Button>
              </div>
            </div>

            <!-- Num Items -->
            <div
              class="space-y-3"
              :class="{ 'opacity-50': settings.view === 'varied' }"
            >
              <label class="text-sm font-medium">Num Items</label>
              <Slider
                :model-value="[settings.numItems]"
                @update:model-value="updateNumItems"
                :min="1"
                :max="24"
                :step="1"
                :disabled="settings.view === 'varied'"
                class="w-full"
              />
              <div class="text-xs text-muted-foreground">
                {{
                  settings.view === 'varied' ? '3 (fixed)' : settings.numItems
                }}
              </div>
            </div>
          </div>

          <!-- PREVIEW CARDS Column -->
          <div class="space-y-4">
            <h4
              class="font-semibold text-sm uppercase tracking-wide text-muted-foreground"
            >
              PREVIEW CARDS
            </h4>

            <!-- Background Color -->
            <div class="space-y-2">
              <label class="text-sm font-medium">Background Color</label>
              <div class="flex items-center gap-2">
                <Input
                  ref="cardColorInput"
                  type="color"
                  class="hover:cursor-pointer"
                  :value="settings.page.backgroundColor"
                  @input="updatePageColor"
                />
                <Input
                  placeholder="#ffffff"
                  type="text"
                  :value="settings.previewCards.backgroundColor"
                  @input="updateCardColor"
                />
              </div>
            </div>

            <!-- Border Radius -->
            <div class="space-y-3">
              <label class="text-sm font-medium">Border Radius ({{ getSliderConfig('borderRadius').unit }})</label>
              <Slider
                :model-value="[settings.previewCards.borderRadius]"
                @update:model-value="updateBorderRadius"
                :min="getSliderConfig('borderRadius').min"
                :max="getSliderConfig('borderRadius').max"
                :step="getSliderConfig('borderRadius').step"
                class="w-full"
              />
              <div class="text-xs text-muted-foreground">
                {{ formatStyleValue('borderRadius', settings.previewCards.borderRadius) }}
              </div>
            </div>

            <!-- Height -->
            <div class="space-y-3">
              <label class="text-sm font-medium">Height ({{ getSliderConfig('height').unit }})</label>
              <Slider
                :model-value="[settings.previewCards.height]"
                @update:model-value="updateHeight"
                :min="getSliderConfig('height').min"
                :max="getSliderConfig('height').max"
                :step="getSliderConfig('height').step"
                class="w-full"
              />
              <div class="text-xs text-muted-foreground">
                {{ formatStyleValue('height', settings.previewCards.height) }}
              </div>
            </div>

            <!-- Width -->
            <div class="space-y-3">
              <label class="text-sm font-medium">Width ({{ getSliderConfig('width').unit }})</label>
              <Slider
                :model-value="[settings.previewCards.width]"
                @update:model-value="updateWidth"
                :min="getSliderConfig('width').min"
                :max="getSliderConfig('width').max"
                :step="getSliderConfig('width').step"
                class="w-full"
              />
              <div class="text-xs text-muted-foreground">
                {{ formatStyleValue('width', settings.previewCards.width) }}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>
