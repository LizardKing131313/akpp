<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { computed } from 'vue'

type ArrowDirection = 'left' | 'right' | 'up' | 'down'

const props = defineProps<{
  direction?: ArrowDirection
  double?: boolean
  class?: string
}>()

const rotationStyle = computed(() => {
  switch (props.direction) {
    case 'left':
      return { transform: 'rotate(180deg)' }
    case 'up':
      return { transform: 'rotate(-90deg)' }
    case 'down':
      return { transform: 'rotate(90deg)' }
    default:
      return {}
  }
})
</script>

<template>
  <svg
    :class="cn('text-brand-red h-5 w-5', props.class)"
    aria-hidden="true"
    fill="none"
    viewBox="0 0 24 24"
    :style="rotationStyle">
    <path
      d="M9 18l6-6-6-6"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2" />

    <path
      v-if="double"
      d="M5 18l6-6-6-6"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2" />
  </svg>
</template>
