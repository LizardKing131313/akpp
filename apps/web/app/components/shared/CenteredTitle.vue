<script setup lang="ts">
import { cn } from '#shared/lib/cn'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <h2 :class="cn('text-center text-2xl font-semibold lg:text-3xl lg:font-bold', props.class)">
    <slot />
  </h2>
</template>
