<script setup lang="ts">
import { Github } from 'lucide-vue-next'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs'
import { Card } from '~/components/ui/card'
import ShadowPreview from '~/components/ShadowPreview.vue'
import ShadowBuilder from '~/components/ShadowBuilder.vue'
import ShadowPresets from '~/components/ShadowPresets.vue'
import PageSettings from '~/components/PageSettings.vue'
import CSSOutput from '~/components/CSSOutput.vue'

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
    <section class="mb-12">
      <div class="text-center mb-6">
        <h3 class="text-xl font-semibold mb-2">Preview Your Box Shadow</h3>
        <p class="text-muted-foreground">
          See how your shadows look on different elements
        </p>
      </div>
      <Card class="p-6">
        <ShadowPreview />
      </Card>
    </section>

    <!-- Main Builder Section -->
    <section class="mb-12">
      <Card class="p-6">
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-primary mb-2">
            Shadow Builder
          </h3>
        </div>

        <Tabs default-value="shadows" class="w-full">
          <TabsList class="grid w-full grid-cols-4">
            <TabsTrigger value="shadows">Shadows</TabsTrigger>
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
          </TabsList>

          <TabsContent value="shadows" class="mt-6">
            <ShadowBuilder />
          </TabsContent>

          <TabsContent value="presets" class="mt-6">
            <ShadowPresets />
          </TabsContent>

          <TabsContent value="settings" class="mt-6">
            <PageSettings />
          </TabsContent>

          <TabsContent value="css" class="mt-6">
            <CSSOutput />
          </TabsContent>
        </Tabs>
      </Card>
    </section>

    <!-- Footer -->
    <footer class="text-center py-8 border-t">
      <div class="flex items-center justify-center gap-4 text-muted-foreground">
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
</template>
