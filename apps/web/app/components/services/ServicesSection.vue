<script setup lang="ts">
import type { RouteLandingItem } from '#shared/types/route-landing'
import type { ServiceItem } from '#shared/types/service'

import { computed } from 'vue'

const props = withDefaults(defineProps<{ title?: string; items?: ServiceItem[] }>(), {
  title: 'Наши услуги',
  items: () => [],
})

const { data: servicesData } = await useServices()
const { data: serviceLandingsData } = await useRouteLandings(() => ({
  page_type: 'service',
}))

const resolvedItems = computed<ServiceItem[]>(() => {
  const items = props.items.length > 0 ? props.items : (servicesData.value ?? [])
  const landingSlugs = new Set(
    (serviceLandingsData.value ?? [])
      .map((landing: RouteLandingItem) => landing.service?.slug ?? '')
      .filter((slug) => slug.length > 0)
  )

  return items.map((service) => ({
    ...service,
    slug: landingSlugs.has(service.slug) ? service.slug : '/',
  }))
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
