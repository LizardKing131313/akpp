<script setup lang="ts">
import type { WhySettings } from '#shared/types/why'

import { useRepairQuizModal } from '~/composables/modal/useRepairQuizModal'
import { useSignupModal } from '~/composables/modal/useSignupModal'

const props = withDefaults(defineProps<WhySettings>(), {
  title: 'Почему клиенты выбирают нас',
  description: 'даже рассмотрев все предложения на рынке',

  image_source: '/images/transmission.png',
  image_alt: 'transmission',

  diagnostic: 'Диагностика за 15 минут!',
  diagnostic_image: '/images/perks/car.svg',
  diagnostic_alt: 'diagnostic',

  tow: 'Бесплатный эвакуатор!',
  tow_image: '/images/perks/truck.svg',
  tow_alt: 'truck',

  guarantee: 'Гарантия сроком на 1 год!',
  guarantee_image: '/images/perks/float.svg',
  guarantee_alt: 'float',

  calculateLabel: 'Рассчитать стоимость',
  signupLabel: 'Записаться',
})

const perks = computed(() => [
  {
    id: 'diagnostic',
    name: props.diagnostic,
    image_source: props.diagnostic_image,
    image_alt: props.diagnostic_alt,
    description: '',
  },
  {
    id: 'tow',
    name: props.tow,
    image_source: props.tow_image,
    image_alt: props.tow_alt,
    description: '',
  },
  {
    id: 'guarantee',
    name: props.guarantee,
    image_source: props.guarantee_image,
    image_alt: props.guarantee_alt,
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
    <NuxtImg :src="image_source" :alt="image_alt" class="h-85 w-full object-contain" />

    <div class="space-y-10">
      <div class="hidden space-y-4 lg:block">
        <CenteredTitle>{{ title }}</CenteredTitle>
        <span class="text-brand-grey block w-full text-center text-sm">
          {{ description }}
        </span>
      </div>

      <div class="hidden flex-row gap-4 lg:flex">
        <PerkCard v-for="perk in perks" :key="perk.id" :perk />
      </div>

      <ActionButtons
        :calculateLabel="calculateLabel"
        :signupLabel="signupLabel"
        @calculate="handleCalculateClick"
        @signup="handleSignupClick" />
    </div>
  </TwoColumns>
</template>
