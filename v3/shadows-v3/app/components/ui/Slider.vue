<template>
  <div :class="cn('relative flex w-full touch-none select-none items-center', $attrs.class)">
    <div class="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <div 
        class="absolute h-full bg-primary" 
        :style="{ width: `${percentage}%` }"
      />
    </div>
    <div 
      class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
      :style="{ left: `${percentage}%`, marginLeft: '-10px', position: 'absolute' }"
      @mousedown="startDrag"
      @touchstart="startDrag"
    />
    <input
      ref="inputRef"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="updateValue"
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '~/utils'

interface SliderProps {
  modelValue: number
  min?: number
  max?: number
  step?: number
}

const props = withDefaults(defineProps<SliderProps>(), {
  min: 0,
  max: 100,
  step: 1
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const inputRef = ref<HTMLInputElement>()

const percentage = computed(() => {
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100
})

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', Number(target.value))
}

const startDrag = (event: MouseEvent | TouchEvent) => {
  event.preventDefault()
  inputRef.value?.focus()
}
</script>