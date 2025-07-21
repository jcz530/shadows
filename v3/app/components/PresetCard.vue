<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs'
import { Card, CardHeader } from '~/components/ui/card'
import PresetItem from '~/components/PresetItem.vue'
import { materialDesignPresets, tailwindPresets } from '~/utils/presets'
</script>

<template>
  <Card class="overflow-hidden pt-0 gap-0">
    <CardHeader class="bg-purple-700">
      <h3 class="text-xl font-semibold pt-6 text-primary-foreground">
        Shadow Presets
      </h3>
      <p class="text-white pb-6">
        Choose from Material Design or Tailwind CSS shadow presets
      </p>
    </CardHeader>

    <Tabs default-value="material" class="w-full">
      <div class="bg-purple-600">
      <TabsList class="rounded-none h-12 p-0 z-20 bg-purple-600">
        <TabsTrigger value="material">Material Design</TabsTrigger>
        <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
      </TabsList>
      </div>

      <TabsContent value="material" class="mt-6 p-6 pt-0">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <PresetItem
            v-for="preset in materialDesignPresets"
            :key="preset.title"
            :preset="preset"
          />
        </div>
      </TabsContent>

      <TabsContent value="tailwind" class="mt-6 p-6 pt-0">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <PresetItem
            v-for="preset in tailwindPresets"
            :key="preset.title"
            :preset="preset"
          />
        </div>
      </TabsContent>
    </Tabs>
  </Card>
</template>
