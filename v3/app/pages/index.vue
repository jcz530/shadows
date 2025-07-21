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
</template>
