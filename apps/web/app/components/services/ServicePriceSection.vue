<script setup lang="ts">
import type { ServicePriceItem } from '#shared/types/service'

import { computed } from 'vue'

const props = withDefaults(defineProps<{ title?: string; items?: ServicePriceItem[] }>(), {
  title: 'Стоимость услуг',
  items: () => [],
})

const { data: servicePricesData } = await useServicePrices()

const resolvedItems = computed<ServicePriceItem[]>(() => {
  if (props.items.length > 0) {
    return props.items
  }

  return servicePricesData.value ?? []
})
</script>

<template>
  <div class="flex h-105.75 w-full flex-col space-y-8">
    <CenteredTitle class="text-left">{{ props.title }}</CenteredTitle>

    <div class="min-h-0 flex-1 overflow-y-auto">
      <ServicePriceCard
        v-for="servicePrice in resolvedItems"
        :key="servicePrice.id"
        :servicePrice />
    </div>
  </div>
</template>
