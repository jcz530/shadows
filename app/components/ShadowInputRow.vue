<script setup lang="ts">
import { Copy, Trash2, Minus, Plus } from 'lucide-vue-next'
import type { Shadow } from '~/stores/shadow'
import { useShadowStore } from '~/stores/shadow'
import { Slider } from '~/components/ui/slider'
import { Switch } from '~/components/ui/switch'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { useEventTracking } from '~/composables/useEventTracking'

interface ShadowInputRowProps {
  shadow: Shadow
}

const props = defineProps<ShadowInputRowProps>()

const emit = defineEmits<{
  duplicate: []
  delete: []
}>()

const shadowStore = useShadowStore()
const { trackEvent } = useEventTracking()

const updateField = (field: keyof Shadow, value: unknown) => {
  // Extract single value from array if slider returns array
  const singleValue = Array.isArray(value) ? value[0] : value
  shadowStore.updateShadowField(props.shadow.id, field, singleValue)
}

// Update field and immediately commit (for discrete actions like toggle, color change, increment/decrement)
const updateFieldAndCommit = (field: keyof Shadow, value: unknown) => {
  const singleValue = Array.isArray(value) ? value[0] : value
  shadowStore.updateShadowField(props.shadow.id, field, singleValue)
  shadowStore.commitShadowFieldUpdate()
}

// Track and commit slider changes only on completion
const handleSliderCommit = (field: keyof Shadow, value: unknown) => {
  const singleValue = Array.isArray(value) ? value[0] : value
  shadowStore.commitShadowFieldUpdate()
  trackEvent('adjust_shadow_field', {
    field: field as string,
    value: singleValue,
  })
}

// Helper functions for increment/decrement with bounds checking
const incrementValue = (field: keyof Shadow, min: number, max: number) => {
  trackEvent('increment_field', { field: field as string })
  const currentValue = props.shadow[field] as number
  const newValue = Math.min(currentValue + 1, max)
  updateFieldAndCommit(field, newValue)
}

const decrementValue = (field: keyof Shadow, min: number, _max: number) => {
  trackEvent('decrement_field', { field: field as string })
  const currentValue = props.shadow[field] as number
  const newValue = Math.max(currentValue - 1, min)
  updateFieldAndCommit(field, newValue)
}
</script>

<template>
  <div class="grid grid-cols-9 items-center gap-4 border-b p-4">
    <!-- On/Off Toggle -->
    <div class="flex justify-center">
      <Switch
        :model-value="shadow.visible"
        @update:model-value="updateFieldAndCommit('visible', $event)"
      />
    </div>

    <!-- Angle -->
    <div class="space-y-2">
      <Label class="text-xs font-medium text-muted-foreground">Angle</Label>
      <div class="space-y-1">
        <Slider
          :model-value="[shadow.angle]"
          :min="0"
          :max="360"
          @update:model-value="updateField('angle', $event)"
          @value-commit="handleSliderCommit('angle', $event)"
        />
        <div
          class="flex flex-col items-center justify-center gap-2 sm:flex-row"
        >
          <Button
            variant="ghost"
            size="sm"
            class="h-6 w-6 p-0"
            @click="decrementValue('angle', 0, 360)"
          >
            <Minus class="h-3 w-3" />
          </Button>
          <div class="min-w-[30px] text-center text-xs">
            {{ shadow.angle }}°
          </div>
          <Button
            variant="ghost"
            size="sm"
            class="h-6 w-6 p-0"
            @click="incrementValue('angle', 0, 360)"
          >
            <Plus class="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Distance -->
    <div class="space-y-2">
      <Label class="text-xs font-medium text-muted-foreground">Distance</Label>
      <div class="space-y-1">
        <Slider
          :model-value="[shadow.distance]"
          :min="0"
          :max="100"
          @update:model-value="updateField('distance', $event)"
          @value-commit="handleSliderCommit('distance', $event)"
        />
        <div
          class="flex flex-col items-center justify-center gap-2 sm:flex-row"
        >
          <Button
            variant="ghost"
            size="sm"
            class="h-6 w-6 p-0"
            @click="decrementValue('distance', 0, 100)"
          >
            <Minus class="h-3 w-3" />
          </Button>
          <div class="min-w-[30px] text-center text-xs">
            {{ shadow.distance }}px
          </div>
          <Button
            variant="ghost"
            size="sm"
            class="h-6 w-6 p-0"
            @click="incrementValue('distance', 0, 100)"
          >
            <Plus class="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Blur -->
    <div class="space-y-2">
      <Label class="text-xs font-medium text-muted-foreground">Blur</Label>
      <div class="space-y-1">
        <Slider
          :model-value="[shadow.blur]"
          :min="0"
          :max="100"
          @update:model-value="updateField('blur', $event)"
          @value-commit="handleSliderCommit('blur', $event)"
        />
        <div
          class="flex flex-col items-center justify-center gap-2 sm:flex-row"
        >
          <Button
            variant="ghost"
            size="sm"
            class="h-6 w-6 p-0"
            @click="decrementValue('blur', 0, 100)"
          >
            <Minus class="h-3 w-3" />
          </Button>
          <div class="min-w-[30px] text-center text-xs">
            {{ shadow.blur }}px
          </div>
          <Button
            variant="ghost"
            size="sm"
            class="h-6 w-6 p-0"
            @click="incrementValue('blur', 0, 100)"
          >
            <Plus class="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Spread -->
    <div class="space-y-2">
      <Label class="text-xs font-medium text-muted-foreground">Spread</Label>
      <div class="space-y-1">
        <Slider
          :model-value="[shadow.spread]"
          :min="-50"
          :max="50"
          @update:model-value="updateField('spread', $event)"
          @value-commit="handleSliderCommit('spread', $event)"
        />
        <div
          class="flex flex-col items-center justify-center gap-2 sm:flex-row"
        >
          <Button
            variant="ghost"
            size="sm"
            class="h-6 w-6 p-0"
            @click="decrementValue('spread', -50, 50)"
          >
            <Minus class="h-3 w-3" />
          </Button>
          <div class="min-w-[30px] text-center text-xs">
            {{ shadow.spread }}px
          </div>
          <Button
            variant="ghost"
            size="sm"
            class="h-6 w-6 p-0"
            @click="incrementValue('spread', -50, 50)"
          >
            <Plus class="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Color -->
    <div class="space-y-2">
      <div class="flex justify-center">
        <input
          type="color"
          :value="shadow.color"
          class="h-8 w-12 cursor-pointer rounded border"
          @input="
            updateFieldAndCommit(
              'color',
              ($event.target as HTMLInputElement).value,
            )
          "
        />
      </div>
    </div>

    <!-- Inset -->
    <div class="space-y-2">
      <div class="flex justify-center">
        <Switch
          :model-value="shadow.inset"
          @update:model-value="updateFieldAndCommit('inset', $event)"
        />
      </div>
    </div>

    <!-- Opacity -->
    <div class="space-y-2">
      <Label class="text-xs font-medium text-muted-foreground">Opacity</Label>
      <div class="space-y-1">
        <Slider
          :model-value="[shadow.opacity]"
          :min="0"
          :max="100"
          @update:model-value="updateField('opacity', $event)"
          @value-commit="handleSliderCommit('opacity', $event)"
        />
        <div
          class="flex flex-col items-center justify-center gap-2 sm:flex-row"
        >
          <Button
            variant="ghost"
            size="sm"
            class="h-6 w-6 p-0"
            @click="decrementValue('opacity', 0, 100)"
          >
            <Minus class="h-3 w-3" />
          </Button>
          <div class="min-w-[30px] text-center text-xs">
            {{ shadow.opacity }}%
          </div>
          <Button
            variant="ghost"
            size="sm"
            class="h-6 w-6 p-0"
            @click="incrementValue('opacity', 0, 100)"
          >
            <Plus class="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-col gap-2 sm:flex-row">
      <Button
        variant="outline"
        size="sm"
        title="Duplicate"
        @click="
          () => {
            trackEvent('duplicate_shadow')
            emit('duplicate')
          }
        "
      >
        <Copy class="h-4 w-4" />
      </Button>
      <Button
        variant="destructive"
        size="sm"
        title="Delete"
        @click="
          () => {
            trackEvent('delete_shadow')
            emit('delete')
          }
        "
      >
        <Trash2 class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
