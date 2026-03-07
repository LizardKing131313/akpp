<script setup lang="ts">
import type { FaqItem } from '#shared/types/faq'

import { computed } from 'vue'

const props = withDefaults(defineProps<{ items?: FaqItem[] }>(), {
  items: () => [],
})

const { data: faqsData } = await useFaqs()

const resolvedItems = computed<FaqItem[]>(() => {
  if (props.items.length > 0) {
    return props.items
  }

  return faqsData.value ?? []
})
</script>

<template>
  <div class="space-y-4">
    <AccordionItem
      v-for="item in resolvedItems"
      :key="item.id"
      :title="item.name ?? ''"
      :content="item.content" />
  </div>
</template>
