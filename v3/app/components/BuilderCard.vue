<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs'
import { Card } from '~/components/ui/card'
import ShadowBuilder from '~/components/ShadowBuilder.vue'
import PageSettings from '~/components/PageSettings.vue'
import CSSOutput from '~/components/CSSOutput.vue'
</script>

<template>
  <Card class="p-6">
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-primary mb-2">
        Shadow Builder
      </h3>
    </div>

    <Tabs default-value="shadows" class="w-full">
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger value="shadows">Shadows</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="css">CSS</TabsTrigger>
      </TabsList>

      <TabsContent value="shadows" class="mt-6">
        <ShadowBuilder />
      </TabsContent>

      <TabsContent value="settings" class="mt-6">
        <PageSettings />
      </TabsContent>

      <TabsContent value="css" class="mt-6">
        <CSSOutput />
      </TabsContent>
    </Tabs>
  </Card>
</template>