<script setup lang="ts">
import type { BrandItem } from '#shared/types/components/brand'

import { cn } from '#shared/lib/cn'

defineProps<{ brand: BrandItem }>()
</script>

<template>
  <NuxtLink
    :to="brand.href"
    :class="
      cn(`
        group hover:bg-brand-soft/40 focus-visible:ring-brand-red/60 relative
        z-0 flex h-full w-full cursor-pointer flex-col items-center justify-center space-y-4
        rounded-lg p-4 transition-all duration-200 hover:z-10
        hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:outline-none
      `)
    ">
    <div class="relative h-12 w-24 transition-transform duration-200 group-hover:scale-[1.06]">
      <NuxtImg
        :src="brand.logo.source"
        :alt="brand.logo.alt"
        fill
        sizes="96px"
        class="absolute inset-0 h-full w-full object-contain" />
    </div>

    <span class="text-brand-dark text-center text-xs font-bold tracking-wide uppercase">
      {{ brand.title }}
    </span>
  </NuxtLink>
</template>
