<script setup lang="ts">
import PreviewSettings from '~/components/PreviewSettings.vue'
import BuilderCard from '~/components/BuilderCard.vue'
import ShadowPreview from '~/components/ShadowPreview.vue'
import PresetCard from '~/components/PresetCard.vue'
import { ref } from 'vue'
import { usePreviewDefaults } from '~/composables/usePreviewDefaults'

useHead({
  title: 'Shadows - CSS Box-Shadow Generator',
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

const { getDefaultSettings } = usePreviewDefaults()

// Preview settings state
const previewSettings = ref(getDefaultSettings())

// Handle settings changes
const handleSettingsChange = (settings: typeof previewSettings.value) => {
  previewSettings.value = { ...settings }
}
</script>

<template>
  <!-- Header -->
  <header class="mb-12 page-width space-y-4">
    <h2 class="text-4xl font-semibold text-foreground mb-12 text-center">
      CSS Box-Shadow Generator
    </h2>
    <p class="text-3xl text-slate-600 max-w-3xl">
      The key to a good box-shadow is <strong>opacity</strong> and
      <strong>layers</strong>.
    </p>
    <p>
      I built this to be a better box-shadow generator. One that allows you to
      visualize how you'll use the shadow in your UI. This is why there are lots
      of settings and presets to help you.
    </p>
    <p>
      This CSS generator allows you to specify multiple shadows and customize
      your viewing options. Customize the page background, the preview card
      colors, and view a grid of cards or a variety of 3 sizes.
    </p>
    <p class="text-sm">
      This project is open-source. Please submit issues through GitHub.
    </p>
  </header>
  <!-- Preview Section -->
  <section class="mb-4">
    <div class="text-center mb-6">
      <h3 class="text-xl font-medium text-slate-600 mb-2">
        Preview Your Box Shadow
      </h3>
      <p class="text-muted-foreground">
        See how your shadows look on different elements
      </p>
    </div>
    <div class="mb-4">
      <PreviewSettings @settings-changed="handleSettingsChange" />
    </div>
    <hr class="page-width" />
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
</template>
