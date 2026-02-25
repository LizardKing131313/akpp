<script setup lang="ts">
import { cn } from '~~/shared/lib/cn'
</script>

<template>
  <div
    :class="
      cn(`
        pointer-events-none absolute inset-0
        bg-[radial-gradient(ellipse_80%_100%_at_center,#3C3C3C_0%,#222222_100%)]
        md:bg-[radial-gradient(ellipse_40%_100%_at_center,#3C3C3C_0%,#222222_100%)]
      `)
    ">
    <slot />
  </div>
</template>
