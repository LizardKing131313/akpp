<script setup lang="ts">
import { computed } from 'vue'

import { useCalculateUiSettings } from '~/composables/useCalculateUiSettings'

const settings = useCalculateUiSettings()

const perks = computed<readonly string[]>(() => settings.value.perks)
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
      <div
        v-for="(perkText, perkIndex) in perks"
        :key="`${perkIndex}:${perkText}`"
        class="flex items-center gap-4">
        <Check />
        <span class="text-brand-white sm:text-xl">{{ perkText }}</span>
      </div>
    </div>
  </div>
</template>
