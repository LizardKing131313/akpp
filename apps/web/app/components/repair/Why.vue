<script setup lang="ts">
import type { PerkItem } from '#shared/types/perk'

import { computed } from 'vue'

import { useRepairQuizModal } from '~/composables/modal/useRepairQuizModal'
import { useSignupModal } from '~/composables/modal/useSignupModal'
import { useWhyUiSettings } from '~/composables/useWhyUiSettings'

withDefaults(
  defineProps<{
    image_source?: string
    image_alt?: string
  }>(),
  {
    image_source: '/images/transmission.png',
    image_alt: 'transmission',
  }
)

const settings = useWhyUiSettings()

const perks = computed<PerkItem[]>(() => [
  {
    id: 'diagnostic',
    name: settings.value.diagnostic,
    image_source: settings.value.diagnostic_image,
    image_alt: settings.value.diagnostic_alt,
    description: '',
  },
  {
    id: 'tow',
    name: settings.value.tow,
    image_source: settings.value.tow_image,
    image_alt: settings.value.tow_alt,
    description: '',
  },
  {
    id: 'guarantee',
    name: settings.value.guarantee,
    image_source: settings.value.guarantee_image,
    image_alt: settings.value.guarantee_alt,
    description: '',
  },
])

const handleCalculateClick = (): void => {
  useRepairQuizModal().openModal()
}

const handleSignupClick = (): void => {
  useSignupModal().openModal()
}
</script>

<template>
  <TwoColumns inverse class="gap-1 lg:gap-20">
    <CmsImage :src="image_source" :alt="image_alt" class="h-85 w-full object-contain" />

    <div class="space-y-10">
      <div class="hidden space-y-4 lg:block">
        <CenteredTitle>{{ settings.title }}</CenteredTitle>
        <span class="text-brand-grey block w-full text-center text-sm">
          {{ settings.description }}
        </span>
      </div>

      <div class="hidden flex-row gap-4 lg:flex">
        <PerkCard v-for="perk in perks" :key="perk.id" :perk />
      </div>

      <ActionButtons
        :calculateLabel="settings.calculateLabel"
        :signupLabel="settings.signupLabel"
        @calculate="handleCalculateClick"
        @signup="handleSignupClick" />
    </div>
  </TwoColumns>
</template>
