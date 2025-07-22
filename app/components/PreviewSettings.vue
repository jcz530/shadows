<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Settings } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { Slider } from '~/components/ui/slider'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { usePreviewDefaults } from '~/composables/usePreviewDefaults'
import { useEventTracking } from '~/composables/useEventTracking'

const { getDefaultSettings, formatStyleValue, getSliderConfig } =
  usePreviewDefaults()
const { trackEvent } = useEventTracking()

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

// Handle slider changes - without tracking (tracking happens on end)
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

// Track slider changes only on completion
const trackBorderRadiusChange = (value: number[]) => {
  trackEvent('adjust_preview_setting', {
    setting: 'border_radius',
    value: value[0],
  })
}

const trackHeightChange = (value: number[]) => {
  trackEvent('adjust_preview_setting', { setting: 'height', value: value[0] })
}

const trackWidthChange = (value: number[]) => {
  trackEvent('adjust_preview_setting', { setting: 'width', value: value[0] })
}

const trackNumItemsChange = (value: number[]) => {
  trackEvent('adjust_preview_setting', {
    setting: 'num_items',
    value: value[0],
  })
}

// View toggle
const toggleView = (view: 'grid' | 'varied') => {
  trackEvent('change_preview_view', { view })
  settings.view = view
  handleSettingsChange()
}

// Track color changes
const handlePageColorChange = () => {
  trackEvent('adjust_preview_setting', { setting: 'page_background_color' })
  handleSettingsChange()
}

const handleCardColorChange = () => {
  trackEvent('adjust_preview_setting', { setting: 'card_background_color' })
  handleSettingsChange()
}

// Track opening the settings popover
const handleOpenSettings = () => {
  trackEvent('open_preview_settings')
}
</script>

<template>
  <div class="flex justify-center">
    <TooltipProvider>
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" size="sm" @click="handleOpenSettings">
            <Settings class="mr-2 h-4 w-4" />
            Adjust Preview Cards
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-96 p-6" side="bottom" align="center">
          <div class="grid grid-cols-2 gap-6">
            <!-- PAGE Column -->
            <div class="space-y-4">
              <h4
                class="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
              >
                PAGE
              </h4>

              <!-- Background Color -->
              <div class="space-y-2">
                <Label class="text-sm font-medium">Background Color</Label>
                <div class="flex items-center gap-2">
                  <Input
                    ref="pageColorInput"
                    v-model="settings.page.backgroundColor"
                    type="color"
                    class="hover:cursor-pointer"
                    @change="handlePageColorChange"
                  />
                  <Input
                    v-model="settings.page.backgroundColor"
                    placeholder="#ffffff"
                    type="text"
                    @input="handlePageColorChange"
                  />
                </div>
              </div>

              <!-- View Toggle -->
              <div class="space-y-2">
                <Label class="text-sm font-medium">View</Label>
                <div class="flex gap-1">
                  <Button
                    variant="outline"
                    :class="[
                      'rounded border p-2',
                      settings.view === 'grid'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background hover:bg-accent',
                    ]"
                    @click="toggleView('grid')"
                  >
                    <div class="grid h-4 w-8 grid-cols-2 gap-1">
                      <div class="rounded-[2px] bg-current"></div>
                      <div class="rounded-[2px] bg-current"></div>
                      <div class="rounded-[2px] bg-current"></div>
                      <div class="rounded-[2px] bg-current"></div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    :class="[
                      'rounded border p-2',
                      settings.view === 'varied'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background hover:bg-accent',
                    ]"
                    @click="toggleView('varied')"
                  >
                    <div
                      class="flex h-4 w-8 items-center justify-center space-x-1"
                    >
                      <div class="h-1 w-2 rounded-[2px] bg-current"></div>
                      <div class="h-3 w-3 rounded-[2px] bg-current"></div>
                      <div class="h-4 w-4 rounded-[2px] bg-current"></div>
                    </div>
                  </Button>
                </div>
              </div>

              <!-- Num Items -->
              <div
                class="space-y-3"
                :class="{ 'opacity-50': settings.view === 'varied' }"
              >
                <Label class="text-sm font-medium">Num Items</Label>
                <Tooltip v-if="settings.view === 'varied'">
                  <TooltipTrigger as-child>
                    <div>
                      <Slider
                        :model-value="[settings.numItems]"
                        :min="1"
                        :max="24"
                        :step="1"
                        :disabled="settings.view === 'varied'"
                        class="w-full"
                        @update:model-value="updateNumItems"
                        @value-commit="trackNumItemsChange"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Set view to Grid to adjust the number of items</p>
                  </TooltipContent>
                </Tooltip>
                <Slider
                  v-else
                  :model-value="[settings.numItems]"
                  :min="1"
                  :max="24"
                  :step="1"
                  class="w-full"
                  @update:model-value="updateNumItems"
                  @value-commit="trackNumItemsChange"
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
                class="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
              >
                PREVIEW CARDS
              </h4>

              <!-- Background Color -->
              <div class="space-y-2">
                <Label class="text-sm font-medium">Background Color</Label>
                <div class="flex items-center gap-2">
                  <Input
                    ref="cardColorInput"
                    v-model="settings.previewCards.backgroundColor"
                    type="color"
                    class="hover:cursor-pointer"
                    @change="handleCardColorChange"
                  />
                  <Input
                    v-model="settings.previewCards.backgroundColor"
                    placeholder="#ffffff"
                    type="text"
                    @input="handleCardColorChange"
                  />
                </div>
              </div>

              <!-- Border Radius -->
              <div class="space-y-3">
                <Label class="text-sm font-medium"
                  >Border Radius ({{
                    getSliderConfig('borderRadius').unit
                  }})</Label
                >
                <Slider
                  :model-value="[settings.previewCards.borderRadius]"
                  :min="getSliderConfig('borderRadius').min"
                  :max="getSliderConfig('borderRadius').max"
                  :step="getSliderConfig('borderRadius').step"
                  class="w-full"
                  @update:model-value="updateBorderRadius"
                  @value-commit="trackBorderRadiusChange"
                />
                <div class="text-xs text-muted-foreground">
                  {{
                    formatStyleValue(
                      'borderRadius',
                      settings.previewCards.borderRadius,
                    )
                  }}
                </div>
              </div>

              <!-- Height -->
              <div class="space-y-3">
                <Label class="text-sm font-medium" for="height"
                  >Height ({{ getSliderConfig('height').unit }})
                </Label>
                <Tooltip v-if="settings.view === 'varied'">
                  <TooltipTrigger as-child>
                    <div>
                      <Slider
                        id="height"
                        :model-value="[settings.previewCards.height]"
                        :min="getSliderConfig('height').min"
                        :max="getSliderConfig('height').max"
                        :step="getSliderConfig('height').step"
                        :disabled="settings.view === 'varied'"
                        class="w-full"
                        @update:model-value="updateHeight"
                        @value-commit="trackHeightChange"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Set view to Grid to adjust height</p>
                  </TooltipContent>
                </Tooltip>
                <Slider
                  v-else
                  id="height"
                  :model-value="[settings.previewCards.height]"
                  :min="getSliderConfig('height').min"
                  :max="getSliderConfig('height').max"
                  :step="getSliderConfig('height').step"
                  class="w-full"
                  @update:model-value="updateHeight"
                  @value-commit="trackHeightChange"
                />
                <div class="text-xs text-muted-foreground">
                  {{ formatStyleValue('height', settings.previewCards.height) }}
                </div>
              </div>

              <!-- Width -->
              <div class="space-y-3">
                <Label class="text-sm font-medium" for="width"
                  >Width ({{ getSliderConfig('width').unit }})</Label
                >
                <Tooltip v-if="settings.view === 'varied'">
                  <TooltipTrigger as-child>
                    <div>
                      <Slider
                        id="width"
                        :model-value="[settings.previewCards.width]"
                        :min="getSliderConfig('width').min"
                        :max="getSliderConfig('width').max"
                        :step="getSliderConfig('width').step"
                        :disabled="settings.view === 'varied'"
                        class="w-full"
                        @update:model-value="updateWidth"
                        @value-commit="trackWidthChange"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Set view to Grid to adjust width</p>
                  </TooltipContent>
                </Tooltip>
                <Slider
                  v-else
                  id="width"
                  :model-value="[settings.previewCards.width]"
                  :min="getSliderConfig('width').min"
                  :max="getSliderConfig('width').max"
                  :step="getSliderConfig('width').step"
                  class="w-full"
                  @update:model-value="updateWidth"
                  @value-commit="trackWidthChange"
                />
                <div class="text-xs text-muted-foreground">
                  {{ formatStyleValue('width', settings.previewCards.width) }}
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  </div>
</template>
