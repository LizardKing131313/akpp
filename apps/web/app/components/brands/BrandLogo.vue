<script setup lang="ts">
import type { BrandItem } from '#shared/types/components/brand'

defineProps<{ brand: BrandItem }>()
</script>

<template>
  <div class="flex items-center gap-2">
    <NuxtImg
      :src="brand.logo.source"
      :alt="brand.logo.alt"
      sizes="28px"
      class="h-7 w-7 rounded-full object-contain p-0.5" />
    <span class="text-brand-grey truncate text-sm font-bold tracking-wide uppercase">
      {{ brand.title }}
    </span>
  </div>
</template>
