<script setup lang="ts">
import type { ServiceItem } from '#shared/types/components/service'

import { computed } from 'vue'

const props = defineProps<{ service: ServiceItem }>()

const cardClass = computed<string>(() => {
  const baseClass =
    'group relative overflow-hidden rounded-2xl bg-surface-soft shadow-sm transition-shadow duration-200 hover:shadow-lg'
  const sizeClass = 'min-h-[120px] sm:min-h-[140px] lg:min-h-[150px]'
  const spanClass = props.service.colspan === 2 ? 'lg:col-span-2' : 'lg:col-span-1'

  return `${baseClass} ${sizeClass} ${spanClass}`
})
</script>

<template>
  <NuxtLink :to="service.href" :class="cardClass">
    <NuxtImg
      :src="service.logo.source"
      :alt="service.logo.alt"
      sizes="(max-width: 1023px) 50vw, 20vw"
      class="absolute inset-0 h-full w-full scale-100 object-cover transition-transform duration-300 ease-out group-hover:scale-105" />

    <div
      class="bg-brand-dark/60 group-hover:bg-brand-dark/30 absolute inset-0 transition-colors duration-300" />
    <div
      class="from-brand-dark/50 via-brand-dark/15 absolute inset-0 bg-linear-to-t to-transparent" />

    <div class="relative flex h-full items-end">
      <div class="flex w-full items-center gap-3 px-5 pb-4">
        <span
          class="text-surface-soft text-[8px] font-semibold tracking-wide uppercase drop-shadow sm:text-xs lg:text-sm lg:font-extrabold">
          {{ service.title }}
        </span>

        <Arrow direction="right" />
      </div>
    </div>
  </NuxtLink>
</template>
