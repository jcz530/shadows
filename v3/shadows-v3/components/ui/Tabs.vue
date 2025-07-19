<template>
  <div :class="cn('w-full', $attrs.class)">
    <div class="flex space-x-1 rounded-lg bg-muted p-1">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="cn(
          'flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          activeTab === tab.value
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )"
        @click="setActiveTab(tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="mt-4">
      <slot :active-tab="activeTab" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '~/utils'

interface Tab {
  label: string
  value: string
}

interface TabsProps {
  tabs: Tab[]
  defaultValue?: string
}

const props = defineProps<TabsProps>()

const activeTab = ref(props.defaultValue || props.tabs[0]?.value || '')

const setActiveTab = (value: string) => {
  activeTab.value = value
}

defineExpose({
  activeTab
})
</script>