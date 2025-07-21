<script setup lang="ts">
import { computed } from 'vue'
import { Copy } from 'lucide-vue-next'
import { useShadowStore } from '~/stores/shadow'
import { copyToClipboard } from '~/utils'
import { Button } from '~/components/ui/button'
import hljs from 'highlight.js/lib/core'
import css from 'highlight.js/lib/languages/css'
import '~/assets/css/highlight-purple-theme.css'

// Register CSS language
hljs.registerLanguage('css', css)

const shadowStore = useShadowStore()

const shadowValue = computed(() => {
  const css = shadowStore.cssShadow
  if (!css || css === 'box-shadow: none;') {
    return 'none'
  }
  // Extract just the value part after "box-shadow: "
  return css.replace('box-shadow: ', '').replace(';', '')
})

const standardCSS = computed(() => {
  return shadowStore.cssShadow || 'box-shadow: none;'
})

const vendorPrefixCSS = computed(() => {
  return shadowStore.cssWithVendorPrefixes || 'box-shadow: none;'
})

// Highlighted CSS computeds
const highlightedStandardCSS = computed(() => {
  const css = standardCSS.value
  return hljs.highlight(css, { language: 'css' }).value
})

const highlightedVendorPrefixCSS = computed(() => {
  const css = vendorPrefixCSS.value
  return hljs.highlight(css, { language: 'css' }).value
})

const highlightedUsageExample = computed(() => {
  const css = `.my-element {\n  ${standardCSS.value}\n}`
  return hljs.highlight(css, { language: 'css' }).value
})

const highlightedTailwindExample = computed(() => {
  const css = `@theme {\n  --shadow-custom: ${shadowValue.value};\n}`
  return hljs.highlight(css, { language: 'css' }).value
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
        <!-- Shadow Value Only -->
        <div>
          <label class="text-sm font-medium">Shadow Value:</label>
          <div class="relative mt-2">
            <pre
              class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"
            ><code class="text-purple-500">{{ shadowValue }}</code></pre>
            <Button
              size="sm"
              variant="outline"
              class="absolute top-2 right-2"
              @click="copyCSS(shadowValue)"
            >
              <Copy class="w-4 h-4" />
            </Button>
          </div>
        </div>

        <!-- Standard CSS -->
        <div>
          <label class="text-sm font-medium">Standard CSS:</label>
          <div class="relative mt-2">
            <pre
              class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"
            ><code v-html="highlightedStandardCSS"></code></pre>
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
            <pre
              class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"
            ><code v-html="highlightedVendorPrefixCSS"></code></pre>
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
      <div class="text-sm space-y-4">
        <div>
          <p class="mb-2">
            Copy the CSS above and apply it to any element in your stylesheet:
          </p>
          <pre
            class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"
          ><code v-html="highlightedUsageExample"></code></pre>
        </div>

        <div>
          <p class="mb-2">
            For Tailwind CSS v4, add a custom shadow to your CSS file using the
            shadow value:
          </p>
          <pre
            class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"
          ><code v-html="highlightedTailwindExample"></code></pre>
          <p class="mt-2">
            Then use it in your HTML with the class
            <code class="bg-muted px-1 rounded">shadow-custom</code>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
