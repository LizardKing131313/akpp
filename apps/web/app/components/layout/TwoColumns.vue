<script setup lang="ts">
import { cn } from '#shared/lib/cn'

const props = defineProps<{ class?: string; inverse?: boolean }>()
</script>

<template>
  <div
    :class="
      cn(
        'grid gap-20 lg:items-start',
        inverse ? 'lg:grid-cols-[0.9fr_1.1fr]' : 'lg:grid-cols-[1.1fr_0.9fr]',
        props.class
      )
    ">
    <slot />
  </div>
</template>
