<script setup lang="ts">
import { Copy, Trash2 } from 'lucide-vue-next'
import type { Shadow } from '~/stores/shadow'
import { useShadowStore } from '~/stores/shadow'
import { Slider } from '~/components/ui/slider'
import { Switch } from '~/components/ui/switch'
import { Button } from '~/components/ui/button'

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
      <label class="text-xs font-medium text-muted-foreground">Angle</label>
      <div class="space-y-1">
        <Slider
          :model-value="[shadow.angle]"
          :min="0"
          :max="360"
          @update:model-value="updateField('angle', $event)"
        />
        <div class="text-xs text-center">{{ shadow.angle }}°</div>
      </div>
    </div>

    <!-- Distance -->
    <div class="space-y-2">
      <label class="text-xs font-medium text-muted-foreground">Distance</label>
      <div class="space-y-1">
        <Slider
          :model-value="[shadow.distance]"
          :min="0"
          :max="100"
          @update:model-value="updateField('distance', $event)"
        />
        <div class="text-xs text-center">{{ shadow.distance }}px</div>
      </div>
    </div>

    <!-- Blur -->
    <div class="space-y-2">
      <label class="text-xs font-medium text-muted-foreground">Blur</label>
      <div class="space-y-1">
        <Slider
          :model-value="[shadow.blur]"
          :min="0"
          :max="100"
          @update:model-value="updateField('blur', $event)"
        />
        <div class="text-xs text-center">{{ shadow.blur }}px</div>
      </div>
    </div>

    <!-- Spread -->
    <div class="space-y-2">
      <label class="text-xs font-medium text-muted-foreground">Spread</label>
      <div class="space-y-1">
        <Slider
          :model-value="[shadow.spread]"
          :min="-50"
          :max="50"
          @update:model-value="updateField('spread', $event)"
        />
        <div class="text-xs text-center">{{ shadow.spread }}px</div>
      </div>
    </div>

    <!-- Color -->
    <div class="space-y-2">
      <label class="text-xs font-medium text-muted-foreground">Color</label>
      <input
        type="color"
        :value="shadow.color"
        @input="updateField('color', ($event.target as HTMLInputElement).value)"
        class="w-12 h-8 rounded border cursor-pointer"
      />
    </div>

    <!-- Opacity -->
    <div class="space-y-2">
      <label class="text-xs font-medium text-muted-foreground">Opacity</label>
      <div class="space-y-1">
        <Slider
          :model-value="[shadow.opacity]"
          :min="0"
          :max="100"
          @update:model-value="updateField('opacity', $event)"
        />
        <div class="text-xs text-center">{{ shadow.opacity }}%</div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-2">
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
