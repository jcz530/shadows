<script lang="ts" setup>
import { Toaster } from '~/components/ui/sonner'
import 'vue-sonner/style.css' // vue-sonner v2 requires this import
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
