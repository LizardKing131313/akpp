<script setup lang="ts">
import type { FaqItem } from '#shared/types/faq'

import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    items?: FaqItem[]
    routeLandingId?: string | undefined
    showOnHomepage?: boolean | undefined
  }>(),
  {
    items: () => [],
  }
)

const { data: faqsData } = await useFaqs(() => ({
  route_landing_id: props.routeLandingId,
  show_on_homepage: props.showOnHomepage,
}))

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
      :title="item.question"
      :content="item.answer" />
  </div>
</template>
