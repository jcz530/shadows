<script lang="ts" setup>
import { Toaster } from '~/components/ui/sonner'
import 'vue-sonner/style.css'
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
