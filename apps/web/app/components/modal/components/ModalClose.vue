<script setup lang="ts">
import { cn } from '#shared/lib/cn'
</script>

<template>
  <button
    type="button"
    :class="
      cn(`
          text-brand-grey hover:text-brand-grey-light absolute top-3
          right-3 grid h-9 w-9 place-items-center rounded-full transition
          sm:top-5 sm:right-5 sm:h-10 sm:w-10
        `)
    "
    aria-label="Закрыть окно">
    <span class="text-2xl leading-none">×</span>
  </button>
</template>
