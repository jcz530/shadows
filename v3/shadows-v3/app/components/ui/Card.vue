<template>
  <div :class="cn('rounded-lg border bg-card text-card-foreground shadow-sm', $attrs.class)" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '~/utils'
</script>