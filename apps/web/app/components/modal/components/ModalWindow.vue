<script setup lang="ts">
import { cn } from '#shared/lib/cn'
</script>

<template>
  <div
    :class="
      cn(`
        bg-brand-white relative w-full max-w-md
          overflow-hidden rounded-2xl shadow-2xl sm:rounded-[28px]
      `)
    ">
    <slot />
  </div>
</template>
