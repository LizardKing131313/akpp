<script setup lang="ts">
import type { PerkItem } from '#shared/types/perk'

withDefaults(defineProps<{ title?: string; perks: PerkItem[] }>(), {
  title: 'Почему клиенты выбирают нас',
  perks: () => [],
})
</script>

<template>
  <div class="space-y-8">
    <CenteredTitle>{{ title }}</CenteredTitle>

    <div class="grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-3">
      <PerkCard v-for="perk in perks" :key="perk.id" :perk />
    </div>
  </div>
</template>
