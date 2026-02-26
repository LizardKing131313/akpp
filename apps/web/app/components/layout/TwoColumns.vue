<script setup lang="ts">
import { cn } from '#shared/lib/cn'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('grid gap-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-start', props.class)">
    <slot />
  </div>
</template>
