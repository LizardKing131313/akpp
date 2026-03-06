<script setup lang="ts">
withDefaults(defineProps<{ title?: string; items?: ServicePriceItem[] }>(), {
  title: 'Стоимость услуг',
  items: () => [],
})
</script>

<template>
  <div class="flex h-105.75 w-full flex-col space-y-8">
    <CenteredTitle class="text-left">{{ title }}</CenteredTitle>

    <div class="min-h-0 flex-1 overflow-y-auto">
      <ServicePriceCard v-for="servicePrice in items" :key="servicePrice.id" :servicePrice />
    </div>
  </div>
</template>
