<script setup lang="ts">
import type { ServiceItem } from '#shared/types/service'

import { computed } from 'vue'

const props = withDefaults(defineProps<{ title?: string; items?: ServiceItem[] }>(), {
  title: 'Наши услуги',
  items: () => [],
})

const { data: servicesData } = await useServices()

const resolvedItems = computed<ServiceItem[]>(() => {
  if (props.items.length > 0) {
    return props.items
  }

  return servicesData.value ?? []
})
</script>

<template>
  <div class="space-y-8">
    <CenteredTitle>{{ props.title }}</CenteredTitle>

    <div class="grid grid-cols-2 gap-8 lg:grid-cols-5">
      <ServiceCard v-for="service in resolvedItems" :key="service.id" :service />
    </div>
  </div>
</template>
