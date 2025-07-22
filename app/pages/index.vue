<script setup lang="ts">
import PreviewSettings from '~/components/PreviewSettings.vue'
import BuilderCard from '~/components/BuilderCard.vue'
import ShadowPreview from '~/components/ShadowPreview.vue'
import PresetCard from '~/components/PresetCard.vue'
import { ref, onMounted } from 'vue'
import { usePreviewDefaults } from '~/composables/usePreviewDefaults'
import { useShadowStore } from '~/stores/shadow'

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

const { getSettingsFromStorage } = usePreviewDefaults()
const shadowStore = useShadowStore()

// Preview settings state - load from storage or defaults
const previewSettings = ref(getSettingsFromStorage())

// Handle settings changes
const handleSettingsChange = (settings: typeof previewSettings.value) => {
  previewSettings.value = { ...settings }
}

// Initialize from history and load from URL on page mount
onMounted(async () => {
  // Capture initial URL state before any modifications
  const hasInitialUrlParams = !!window.location.search

  // First try to initialize from history
  const initializedFromHistory = await shadowStore.initializeFromHistory()

  // Only load from URL if we didn't initialize from history AND URL had parameters initially
  if (!initializedFromHistory && hasInitialUrlParams) {
    await shadowStore.loadFromUrl()
  }
})
</script>

<template>
  <div>
    <!-- Header -->
    <header class="page-width mb-12 space-y-4">
      <h2 class="mb-12 text-center text-4xl font-semibold text-foreground">
        CSS Box-Shadow Generator
      </h2>
      <p class="max-w-3xl text-3xl text-slate-600">
        The key to a good box-shadow is <strong>opacity</strong> and
        <strong>layers</strong>.
      </p>
      <p>
        I built this to be a better box-shadow generator. One that allows you to
        visualize how you'll use the shadow in your UI. This is why there are
        lots of settings and presets to help you.
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
      <div class="mb-6 text-center">
        <h3 class="mb-2 text-xl font-medium text-slate-600">
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
  </div>
</template>
