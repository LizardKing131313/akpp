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
</script>

<template>
  <section class="w-full">
    <div
      class="grid grid-cols-2 items-stretch gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-16">
      <ShopItem v-for="item in resolvedItems" :key="item.id" :transmissionItem="item" />
    </div>
  </section>
</template>
