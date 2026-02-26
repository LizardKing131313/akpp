<script setup lang="ts">
import type { WorkExample } from '#shared/types/components/work_example'

defineProps<{ work: WorkExample; lineClamp?: string }>()
</script>
<template>
  <div>
    <BrandLogo :brand="work.brand" />

    <p class="text-brand-dark line-clamp-1 text-sm leading-snug font-bold group-hover:underline">
      {{ work.title }}
    </p>

    <p class="text-brand-grey-light text-xs">
      {{ work.date }}
    </p>
  </div>
</template>
