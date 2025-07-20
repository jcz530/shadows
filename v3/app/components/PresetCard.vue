<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs'
import { Card } from '~/components/ui/card'
import PresetItem from '~/components/PresetItem.vue'
import { materialDesignPresets, tailwindPresets } from '~/utils/presets'
</script>

<template>
  <Card class="p-6">
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-primary mb-2">
        Shadow Presets
      </h3>
      <p class="text-muted-foreground">
        Choose from Material Design or Tailwind CSS shadow presets
      </p>
    </div>

    <Tabs default-value="material" class="w-full">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="material">Material Design</TabsTrigger>
        <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
      </TabsList>

      <TabsContent value="material" class="mt-6">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <PresetItem
            v-for="preset in materialDesignPresets"
            :key="preset.title"
            :preset="preset"
          />
        </div>
      </TabsContent>

      <TabsContent value="tailwind" class="mt-6">
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
