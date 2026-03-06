<script setup lang="ts">
withDefaults(defineProps<{ items?: FaqItem[] }>(), {
  items: () => [],
})
</script>

<template>
  <div class="space-y-4">
    <AccordionItem
      v-for="item in items"
      :key="item.id"
      :title="item.name ?? ''"
      :content="item.content" />
  </div>
</template>
