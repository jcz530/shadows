<script setup lang="ts">
import { computed } from 'vue'
import { Copy } from 'lucide-vue-next'
import { useShadowStore } from '~/stores/shadow'
import { copyToClipboard } from '~/utils'
import { Button } from '~/components/ui/button'

const shadowStore = useShadowStore()

const standardCSS = computed(() => {
  return shadowStore.cssShadow || 'box-shadow: none;'
})

const vendorPrefixCSS = computed(() => {
  return shadowStore.cssWithVendorPrefixes || 'box-shadow: none;'
})

const copyCSS = async (css: string) => {
  const success = await copyToClipboard(css)
  if (success) {
    console.log('CSS copied to clipboard!')
  }
}
</script>
<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold mb-4">Generated CSS</h3>
      <div class="space-y-4">
        <!-- Standard CSS -->
        <div>
          <label class="text-sm font-medium">Standard CSS:</label>
          <div class="relative mt-2">
            <pre class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"><code>{{ standardCSS }}</code></pre>
            <Button
              size="sm"
              variant="outline"
              class="absolute top-2 right-2"
              @click="copyCSS(standardCSS)"
            >
              <Copy class="w-4 h-4" />
            </Button>
          </div>
        </div>

        <!-- CSS with vendor prefixes -->
        <div>
          <label class="text-sm font-medium">CSS with Vendor Prefixes:</label>
          <div class="relative mt-2">
            <pre class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"><code>{{ vendorPrefixCSS }}</code></pre>
            <Button
              size="sm"
              variant="outline"
              class="absolute top-2 right-2"
              @click="copyCSS(vendorPrefixCSS)"
            >
              <Copy class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3 class="text-lg font-semibold mb-4">Usage</h3>
      <div class="text-sm text-muted-foreground space-y-2">
        <p>Copy the CSS above and apply it to any element in your stylesheet:</p>
        <pre class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"><code>.my-element {
  {{ standardCSS }}
}</code></pre>
      </div>
    </div>
  </div>
</template>
