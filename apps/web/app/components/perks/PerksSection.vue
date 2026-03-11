<script setup lang="ts">
import type { PerkItem } from '#shared/types/perk'

import { computed } from 'vue'

import { usePerks } from '~/composables/useRepoApi'

withDefaults(defineProps<{ title?: string }>(), {
  title: 'Почему клиенты выбирают нас',
})

const { data: perksData } = await usePerks()

const perks = computed<PerkItem[]>(() => perksData.value ?? [])
</script>

<template>
  <div class="space-y-8">
    <CenteredTitle>{{ title }}</CenteredTitle>

    <div class="grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-3">
      <PerkCard v-for="perk in perks" :key="perk.id" :perk />
    </div>
  </div>
</template>
