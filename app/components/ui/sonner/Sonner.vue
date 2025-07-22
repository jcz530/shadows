<script lang="ts" setup>
import { Toaster as Sonner, type ToasterProps } from 'vue-sonner'

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    class="toaster group"
    v-bind="props"
    rich-colors
    :style="{
      '--success-bg': 'var(--color-purple-100)',
      '--success-border': 'var(--color-purple-200)',
      '--success-text': 'var(--color-purple-600)',
      '--error-bg': 'var(--color-rose-100)',
      '--error-border': 'var(--color-rose-200)',
      '--error-text': 'var(--color-rose-700)',
    }"
  />
</template>

<style scoped></style>
