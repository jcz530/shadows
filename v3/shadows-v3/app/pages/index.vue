<script setup lang="ts">
import { Github } from 'lucide-vue-next'
import Tabs from '~/components/ui/Tabs.vue'
import Card from '~/components/ui/Card.vue'
const activeTab = ref('')
useHead({
  title: 'Shadows V3 - CSS Box-Shadow Generator',
  meta: [
    {
      name: 'description',
      content: 'Modern CSS box-shadow generator with real-time preview, multiple layers, and Material Design & Tailwind CSS presets. Built with Vue 3 and Nuxt 3.'
    },
    {
      property: 'og:title',
      content: 'Shadows V3 - CSS Box-Shadow Generator'
    },
    {
      property: 'og:description',
      content: 'Modern CSS box-shadow generator with real-time preview, multiple layers, and Material Design & Tailwind CSS presets.'
    },
    {
      property: 'og:type',
      content: 'website'
    }
  ]
})
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <!-- Header -->
    <header class="text-center mb-12">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-4xl font-bold text-primary">Shadows V3</h1>
        <a
          href="https://github.com/joeczubiak"
          target="_blank"
          rel="noopener noreferrer"
          class="text-muted-foreground hover:text-foreground"
        >
          <Github class="w-6 h-6" />
        </a>
      </div>
      <h2 class="text-2xl font-semibold text-foreground mb-4">CSS Box-Shadow Generator</h2>
      <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
        The key to a good box-shadow is <strong>opacity</strong> and <strong>layers</strong>.
        This modern CSS generator allows you to visualize and create multiple shadow layers with real-time preview.
      </p>
    </header>

    <!-- Preview Section -->
    <section class="mb-12">
      <div class="text-center mb-6">
        <h3 class="text-xl font-semibold mb-2">Preview Your Box Shadow</h3>
        <p class="text-muted-foreground">See how your shadows look on different elements</p>
      </div>
      <Card class="p-6">
        <ShadowPreview />
      </Card>
    </section>

    <!-- Main Builder Section -->
    <section class="mb-12">
      <Card class="p-6">
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-primary mb-2">Shadow Builder</h3>
        </div>

        <Tabs
          :tabs="[
            { label: 'Shadows', value: 'shadows' },
            { label: 'Presets', value: 'presets' },
            { label: 'Settings', value: 'settings' },
            { label: 'CSS', value: 'css' }
          ]"
          default-value="shadows"
        >
          <template #default="{ activeTab }">
            <div v-if="activeTab === 'shadows'" class="mt-6">
              <ShadowBuilder />
            </div>

            <div v-if="activeTab === 'presets'" class="mt-6">
              <ShadowPresets />
            </div>

            <div v-if="activeTab === 'settings'" class="mt-6">
              <PageSettings />
            </div>

            <div v-if="activeTab === 'css'" class="mt-6">
              <CSSOutput />
            </div>
          </template>
        </Tabs>
      </Card>
    </section>

    <!-- Footer -->
    <footer class="text-center py-8 border-t">
      <div class="flex items-center justify-center gap-4 text-muted-foreground">
        <Github class="w-4 h-4" />
        <span>Built by Joe Czubiak</span>
        <span>•</span>
        <span>{{ new Date().getFullYear() }} - Shadows: A CSS Box Shadow Generator</span>
      </div>
    </footer>
  </div>
</template>
