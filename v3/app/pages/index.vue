<script setup lang="ts">
import { ref } from 'vue'
import { Github } from 'lucide-vue-next'
import ShadowPreview from '~/components/ShadowPreview.vue'
import PreviewSettings from '~/components/PreviewSettings.vue'
import PresetCard from '~/components/PresetCard.vue'
import BuilderCard from '~/components/BuilderCard.vue'
import { usePreviewDefaults } from '~/composables/usePreviewDefaults'

const { getDefaultSettings } = usePreviewDefaults()

// Preview settings state
const previewSettings = ref(getDefaultSettings())

// Handle settings changes
const handleSettingsChange = (settings: typeof previewSettings.value) => {
  previewSettings.value = { ...settings }
}

useHead({
  title: 'Shadows V3 - CSS Box-Shadow Generator',
  meta: [
    {
      name: 'description',
      content:
        'Modern CSS box-shadow generator with real-time preview, multiple layers, and Material Design & Tailwind CSS presets. Built with Vue 3 and Nuxt 3.',
    },
    {
      property: 'og:title',
      content: 'Shadows V3 - CSS Box-Shadow Generator',
    },
    {
      property: 'og:description',
      content:
        'Modern CSS box-shadow generator with real-time preview, multiple layers, and Material Design & Tailwind CSS presets.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Navigation Bar -->
    <nav class="bg-primary px-6 py-4 shadow-lg">
      <div
        class="container mx-auto max-w-7xl flex items-center justify-between"
      >
        <div class="flex items-center">
          <img
            src="~/assets/shadows-logo.svg"
            alt="Shadows"
            class="h-8 w-auto"
          />
        </div>
        <a
          href="https://github.com/joeczubiak"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
        >
          <Github class="w-6 h-6" />
        </a>
      </div>
    </nav>

    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <header class="text-center mb-12">
        <h2 class="text-2xl font-semibold text-foreground mb-4">
          CSS Box-Shadow Generator
        </h2>
        <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
          The key to a good box-shadow is <strong>opacity</strong> and
          <strong>layers</strong>. This modern CSS generator allows you to
          visualize and create multiple shadow layers with real-time preview.
        </p>
      </header>

      <!-- Preview Section -->
      <section class="mb-4">
        <div class="text-center mb-6">
          <h3 class="text-xl font-semibold mb-2">Preview Your Box Shadow</h3>
          <p class="text-muted-foreground">
            See how your shadows look on different elements
          </p>
        </div>
        <div class="mb-4">
          <PreviewSettings @settings-changed="handleSettingsChange" />
        </div>
        <hr />
        <ShadowPreview :settings="previewSettings" />
      </section>

      <!-- Main Builder Section -->
      <section class="mb-12">
        <BuilderCard />
      </section>

      <!-- Presets Section -->
      <section class="mb-12">
        <PresetCard />
      </section>

      <!-- Footer -->
      <footer class="text-center py-8 border-t bg-purple-600">
        <div
          class="flex items-center justify-center gap-4 text-muted-foreground"
        >
          <Github class="w-4 h-4" />
          <span>Built by Joe Czubiak</span>
          <span>•</span>
          <span
            >{{ new Date().getFullYear() }} - Shadows: A CSS Box Shadow
            Generator</span
          >
        </div>
      </footer>
    </div>
  </div>
</template>
