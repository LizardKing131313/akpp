<script setup lang="ts">
import type { CalculatePerkItem, CalculateSettings } from '#shared/types/calculate'

import { computed } from 'vue'

import { useCalculateSettings } from '~/composables/useRepoApi'

const { data: settingsData } = await useCalculateSettings()

const settings = computed<CalculateSettings>(() => settingsData.value ?? ({} as CalculateSettings))

const perks = computed<readonly CalculatePerkItem[]>(() => settings.value.perks)
</script>

<template>
  <div class="flex h-full flex-col justify-center gap-5 px-4 pt-12 sm:gap-8 lg:pt-0">
    <h2 class="text-brand-white text-2xl leading-tight font-bold sm:text-4xl">
      {{ settings.title_main }}
      <span class="text-brand-red"> {{ settings.title_accent }} </span>
    </h2>

    <p class="text-brand-grey-light text-xs leading-6 sm:text-lg">
      {{ settings.description }}
    </p>

    <div class="hidden space-y-4 lg:block">
      <div v-for="perk in perks" :key="perk.id" class="flex items-center gap-4">
        <Check />
        <span class="text-brand-white sm:text-xl">{{ perk.name }}</span>
      </div>
    </div>
  </div>
</template>
