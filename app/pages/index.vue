<script setup lang="ts">
import PreviewSettings from '~/components/PreviewSettings.vue'
import BuilderCard from '~/components/BuilderCard.vue'
import ShadowPreview from '~/components/ShadowPreview.vue'
import PresetCard from '~/components/PresetCard.vue'
import { ref, onMounted } from 'vue'
import { usePreviewDefaults } from '~/composables/usePreviewDefaults'
import { useShadowStore } from '~/stores/shadow'

useHead({
  title: 'Shadows - CSS Box-Shadow Generator | Free Multi-Layer Shadow Tool',
  meta: [
    {
      name: 'description',
      content:
        'Create stunning CSS box-shadows with our free online generator. Multi-layer support, real-time preview, Material Design & Tailwind presets. Copy CSS instantly.',
    },
    {
      name: 'keywords',
      content:
        'CSS box-shadow generator, shadow generator, CSS shadows, multi-layer shadows, Material Design shadows, Tailwind CSS shadows, web design tool, CSS generator, box shadow maker',
    },
    {
      name: 'author',
      content: 'Joe Czubiak',
    },
    {
      property: 'og:title',
      content:
        'Shadows - Free CSS Box-Shadow Generator with Multi-Layer Support',
    },
    {
      property: 'og:description',
      content:
        'Create stunning CSS box-shadows with real-time preview, multiple layers, and presets for Material Design & Tailwind CSS. Free online tool.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Shadows - Free CSS Box-Shadow Generator',
    },
    {
      name: 'twitter:description',
      content:
        'Create stunning CSS box-shadows with real-time preview and multi-layer support. Free online tool with Material Design & Tailwind presets.',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Shadows - CSS Box-Shadow Generator',
        description:
          'Free online CSS box-shadow generator with multi-layer support, real-time preview, and presets for Material Design and Tailwind CSS.',
        url: 'https://shadows.joeczubiak.com',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web Browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        creator: {
          '@type': 'Person',
          name: 'Joe Czubiak',
          url: 'https://joeczubiak.com',
        },
        featureList: [
          'Multi-layer shadow support',
          'Real-time preview',
          'Material Design presets',
          'Tailwind CSS presets',
          'Copy CSS output',
          'Shareable URLs',
          'Visual shadow builder',
        ],
        screenshot: 'https://shadows.joeczubiak.com/shadows-social-image.png',
      }),
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://shadows.joeczubiak.com',
    },
  ],
})

const { getDefaultSettings, getSettingsFromStorage } = usePreviewDefaults()
const shadowStore = useShadowStore()

// Preview settings state - start with defaults to avoid hydration mismatch
const previewSettings = ref(getDefaultSettings())

// Handle settings changes
const handleSettingsChange = (settings: typeof previewSettings.value) => {
  previewSettings.value = { ...settings }
}

// Initialize from history and load from URL on page mount
onMounted(async () => {
  // Load stored preview settings after hydration to avoid mismatch
  previewSettings.value = getSettingsFromStorage()

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
      <h1 class="mb-12 text-center text-4xl font-semibold text-foreground">
        CSS Box-Shadow Generator
      </h1>
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
        This project is
        <a
          href="https://github.com/jcz530/shadows"
          class="text-purple-600 hover:underline"
          aria-label="View source code on GitHub"
          target="_blank"
          rel="noopener"
          >open-source</a
        >. Please submit issues through GitHub.
      </p>
    </header>

    <!-- Main Content -->
    <main>
      <!-- Preview Section -->
      <section class="mb-4" aria-labelledby="preview-heading">
        <div class="mb-6 text-center">
          <h2
            id="preview-heading"
            class="mb-2 text-xl font-medium text-slate-600"
          >
            Preview Your Box Shadow
          </h2>
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

      <!-- Builder Section -->
      <section class="mb-12" aria-labelledby="builder-heading">
        <h2 id="builder-heading" class="sr-only">Shadow Builder Controls</h2>
        <BuilderCard />
      </section>

      <!-- Presets Section -->
      <section class="mb-12" aria-labelledby="presets-heading">
        <h2 id="presets-heading" class="sr-only">Shadow Presets</h2>
        <PresetCard />
      </section>

      <!-- FAQ Section -->
      <section
        class="page-width mb-12"
        itemscope
        itemtype="https://schema.org/FAQPage"
      >
        <h2 class="mb-6 text-2xl font-semibold text-foreground">
          Frequently Asked Questions
        </h2>

        <article
          class="mb-4"
          itemscope
          itemprop="mainEntity"
          itemtype="https://schema.org/Question"
        >
          <h3 class="mb-2 text-lg font-medium" itemprop="name">
            What makes a good CSS box-shadow?
          </h3>
          <div
            itemscope
            itemprop="acceptedAnswer"
            itemtype="https://schema.org/Answer"
          >
            <p itemprop="text">
              The key to realistic shadows is using multiple layers with proper
              opacity. Real shadows are complex - they have sharp edges close to
              objects and soft, diffused edges further away. Our generator lets
              you layer multiple shadows to achieve this realistic depth.
            </p>
          </div>
        </article>

        <article
          class="mb-4"
          itemscope
          itemprop="mainEntity"
          itemtype="https://schema.org/Question"
        >
          <h3 class="mb-2 text-lg font-medium" itemprop="name">
            How should I use opacity in CSS box-shadows?
          </h3>
          <div
            itemscope
            itemprop="acceptedAnswer"
            itemtype="https://schema.org/Answer"
          >
            <p itemprop="text">
              Opacity is what really lets us make good box-shadows by allowing
              us to layer the shadows. I recommend that you use a mix of
              opacities between .04 and 0.25. You can do so by using an rgba
              value of

              <pre
                class="inline overflow-x-auto rounded-lg bg-muted p-1 text-sm"
              ><code>rgba(0, 0, 0, 0.10)</code></pre>.
            </p>
          </div>
        </article>

        <article
          class="mb-4"
          itemscope
          itemprop="mainEntity"
          itemtype="https://schema.org/Question"
        >
          <h3 class="mb-2 text-lg font-medium" itemprop="name">
            How do I use Material Design shadows?
          </h3>
          <div
            itemscope
            itemprop="acceptedAnswer"
            itemtype="https://schema.org/Answer"
          >
            <p itemprop="text">
              Material Design uses elevation levels from 1-24, each with
              specific shadow combinations. Use our Material Design presets to
              get the exact shadows specified in Google's design system. Higher
              elevation numbers create more pronounced shadows. You can copy the
              CSS here and use it in your own project.
            </p>
          </div>
        </article>

        <article
          class="mb-4"
          itemscope
          itemprop="mainEntity"
          itemtype="https://schema.org/Question"
        >
          <h3 class="mb-2 text-lg font-medium" itemprop="name">
            Can I copy the CSS code?
          </h3>
          <div
            itemscope
            itemprop="acceptedAnswer"
            itemtype="https://schema.org/Answer"
          >
            <p itemprop="text">
              Yes! Our generator provides clean CSS output with vendor prefixes
              for maximum browser compatibility. Simply click the copy button to
              get the complete box-shadow CSS property ready for your project.
              To see more in depth usage of the CSS, click on the CSS tab in the
              shadow builder.
            </p>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>
