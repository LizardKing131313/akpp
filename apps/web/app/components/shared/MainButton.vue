<script setup lang="ts">
import { cn } from '#shared/lib/cn'

const props = defineProps<{ class?: string; reverse?: boolean }>()
</script>

<template>
  <button
    type="button"
    :class="
      cn(
        reverse
          ? 'text-brand-red hover:bg-brand-red hover:text-brand-white bg-brand-white'
          : 'bg-brand-red/90 text-brand-white hover:bg-brand-red',
        `
          border-brand-red group w-full rounded-full border py-4 text-base
          font-bold shadow-lg transition-transform duration-200 hover:scale-[1.02]
          active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg
        `,
        props.class
      )
    ">
    <slot />
  </button>
</template>
