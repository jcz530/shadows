<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Card, CardHeader } from '~/components/ui/card'
import ShadowBuilder from '~/components/ShadowBuilder.vue'
import CSSOutput from '~/components/CSSOutput.vue'
</script>

<template>
  <Card class="overflow-hidden pt-0 gap-0">
    <CardHeader class="bg-purple-700">
      <h3 class="text-xl py-2 text-primary-foreground">Shadow Builder</h3>
    </CardHeader>
    <Tabs default-value="shadows" class="w-full pt-0 mt-0">
      <div class="bg-purple-600">
        <TabsList class="rounded-none h-12 p-0 z-20 bg-purple-600">
          <TabsTrigger value="shadows">Shadows</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="shadows" class="-mt-2">
        <ShadowBuilder />
      </TabsContent>

      <TabsContent value="css" class="mt-6 p-6 pt-0">
        <CSSOutput />
      </TabsContent>
    </Tabs>
  </Card>
</template>
