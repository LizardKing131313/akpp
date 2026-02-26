<script setup lang="ts">
import type { PerkItem } from '#shared/types/components/perk'

defineProps<{ perk: PerkItem }>()
</script>

<template>
  <div class="flex flex-col items-center space-y-4 text-center">
    <NuxtImg
      :src="perk.logo.source"
      :alt="perk.logo.alt"
      width="48"
      height="48"
      class="block h-12 w-12 object-contain" />

    <h3 v-if="perk.title" class="text-brand-dark text-center text-sm font-bold lg:text-lg">
      {{ perk.title }}
    </h3>

    <p class="text-brand-grey hidden max-w-[36ch] text-center text-xs md:block md:text-sm">
      {{ perk.description }}
    </p>
  </div>
</template>
