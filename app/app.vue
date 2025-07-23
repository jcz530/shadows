<script lang="ts" setup>
import { Toaster } from '~/components/ui/sonner'
import 'vue-sonner/style.css'
import { useKeyboardShortcuts } from '~/composables/useKeyboardShortcuts'
// Initialize keyboard shortcuts globally
useKeyboardShortcuts()
</script>
<template>
  <div class="min-h-screen bg-background">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster />
  </div>
</template>
