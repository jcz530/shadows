<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Card, CardHeader } from '~/components/ui/card'
import ShadowBuilder from '~/components/ShadowBuilder.vue'
import CSSOutput from '~/components/CSSOutput.vue'
</script>

<template>
  <Card class="gap-0 overflow-hidden pt-0">
    <CardHeader class="bg-purple-700">
      <h3 class="py-2 text-xl text-primary-foreground">Shadow Builder</h3>
    </CardHeader>
    <Tabs default-value="shadows" class="mt-0 w-full pt-0">
      <div class="bg-purple-600">
        <TabsList class="z-20 h-12 rounded-none bg-purple-600 p-0">
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
