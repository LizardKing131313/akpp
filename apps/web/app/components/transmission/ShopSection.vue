<script setup lang="ts">
import type { TransmissionItem } from '#shared/types/transmission'

import { computed } from 'vue'

const props = withDefaults(defineProps<{ items?: TransmissionItem[] }>(), { items: () => [] })

const { data: transmissionsData } = await useTransmissions()

const resolvedItems = computed<TransmissionItem[]>(() => {
  if (props.items.length > 0) {
    return props.items
  }

  return transmissionsData.value ?? []
})

const requestUrl = useRequestURL()
const productsJsonLd = computed<Record<string, unknown> | null>(() => {
  if (resolvedItems.value.length === 0) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@graph': resolvedItems.value.map((item) => ({
      '@type': 'Product',
      '@id': `${requestUrl.origin}/sale-akpp#product-${item.id}`,
      name: item.name,
      description: item.description,
      image: item.image_source ? [new URL(item.image_source, requestUrl.origin).toString()] : [],
      offers: {
        '@type': 'Offer',
        priceCurrency: 'RUB',
        price: item.price,
        availability: 'https://schema.org/InStock',
        url: `${requestUrl.origin}/sale-akpp`,
      },
    })),
  }
})

useHead(() => {
  if (productsJsonLd.value === null) {
    return {}
  }

  return {
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(productsJsonLd.value),
      },
    ],
  }
})
</script>

<template>
  <section class="w-full">
    <div
      class="grid grid-cols-2 items-stretch gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-16">
      <ShopItem v-for="item in resolvedItems" :key="item.id" :transmissionItem="item" />
    </div>
  </section>
</template>
