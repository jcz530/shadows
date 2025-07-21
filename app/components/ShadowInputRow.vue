<script setup lang="ts">
import { Copy, Trash2, Minus, Plus } from 'lucide-vue-next'
import type { Shadow } from '~/stores/shadow'
import { useShadowStore } from '~/stores/shadow'
import { Slider } from '~/components/ui/slider'
import { Switch } from '~/components/ui/switch'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/Label'

interface ShadowInputRowProps {
  shadow: Shadow
}

const props = defineProps<ShadowInputRowProps>()

const emit = defineEmits<{
  duplicate: []
  delete: []
}>()

const shadowStore = useShadowStore()

const updateField = (field: keyof Shadow, value: any) => {
  // Extract single value from array if slider returns array
  const singleValue = Array.isArray(value) ? value[0] : value
  shadowStore.updateShadowField(props.shadow.id, field, singleValue)
}

// Helper functions for increment/decrement with bounds checking
const incrementValue = (field: keyof Shadow, min: number, max: number) => {
  const currentValue = props.shadow[field] as number
  const newValue = Math.min(currentValue + 1, max)
  updateField(field, newValue)
}

const decrementValue = (field: keyof Shadow, min: number, max: number) => {
  const currentValue = props.shadow[field] as number
  const newValue = Math.max(currentValue - 1, min)
  updateField(field, newValue)
}
</script>

<template>
  <div class="grid grid-cols-8 gap-4 items-center p-4 border-b">
    <!-- On/Off Toggle -->
    <div class="flex justify-center">
      <Switch
        :model-value="shadow.visible"
        @update:model-value="updateField('visible', $event)"
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
        />
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-2"
        >
          <Button
            variant="ghost"
            size="sm"
            @click="decrementValue('angle', 0, 360)"
            class="h-6 w-6 p-0"
          >
            <Minus class="w-3 h-3" />
          </Button>
          <div class="text-xs min-w-[30px] text-center">
            {{ shadow.angle }}°
          </div>
          <Button
            variant="ghost"
            size="sm"
            @click="incrementValue('angle', 0, 360)"
            class="h-6 w-6 p-0"
          >
            <Plus class="w-3 h-3" />
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
        />
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-2"
        >
          <Button
            variant="ghost"
            size="sm"
            @click="decrementValue('distance', 0, 100)"
            class="h-6 w-6 p-0"
          >
            <Minus class="w-3 h-3" />
          </Button>
          <div class="text-xs min-w-[30px] text-center">
            {{ shadow.distance }}px
          </div>
          <Button
            variant="ghost"
            size="sm"
            @click="incrementValue('distance', 0, 100)"
            class="h-6 w-6 p-0"
          >
            <Plus class="w-3 h-3" />
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
        />
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-2"
        >
          <Button
            variant="ghost"
            size="sm"
            @click="decrementValue('blur', 0, 100)"
            class="h-6 w-6 p-0"
          >
            <Minus class="w-3 h-3" />
          </Button>
          <div class="text-xs min-w-[30px] text-center">
            {{ shadow.blur }}px
          </div>
          <Button
            variant="ghost"
            size="sm"
            @click="incrementValue('blur', 0, 100)"
            class="h-6 w-6 p-0"
          >
            <Plus class="w-3 h-3" />
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
        />
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-2"
        >
          <Button
            variant="ghost"
            size="sm"
            @click="decrementValue('spread', -50, 50)"
            class="h-6 w-6 p-0"
          >
            <Minus class="w-3 h-3" />
          </Button>
          <div class="text-xs min-w-[30px] text-center">
            {{ shadow.spread }}px
          </div>
          <Button
            variant="ghost"
            size="sm"
            @click="incrementValue('spread', -50, 50)"
            class="h-6 w-6 p-0"
          >
            <Plus class="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Color -->
    <div class="space-y-2">
      <Label class="text-xs font-medium text-muted-foreground">Color</Label>
      <input
        type="color"
        :value="shadow.color"
        @input="updateField('color', ($event.target as HTMLInputElement).value)"
        class="w-12 h-8 rounded border cursor-pointer"
      />
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
        />
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-2"
        >
          <Button
            variant="ghost"
            size="sm"
            @click="decrementValue('opacity', 0, 100)"
            class="h-6 w-6 p-0"
          >
            <Minus class="w-3 h-3" />
          </Button>
          <div class="text-xs min-w-[30px] text-center">
            {{ shadow.opacity }}%
          </div>
          <Button
            variant="ghost"
            size="sm"
            @click="incrementValue('opacity', 0, 100)"
            class="h-6 w-6 p-0"
          >
            <Plus class="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-col sm:flex-row gap-2">
      <Button
        variant="outline"
        size="sm"
        @click="$emit('duplicate')"
        title="Duplicate"
      >
        <Copy class="w-4 h-4" />
      </Button>
      <Button
        variant="destructive"
        size="sm"
        @click="$emit('delete')"
        title="Delete"
      >
        <Trash2 class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>
