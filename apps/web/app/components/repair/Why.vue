<script setup lang="ts">
import { getBrands } from '#server/api/brands/brands.get'
import { getProblems, getSymptoms } from '#server/api/quiz/quiz.get'
import { ItemImage } from '#shared/types/components/image'
import { PerkItem } from '#shared/types/components/perk'

import { useRepairQuizModal } from '~/composables/modal/useRepairQuizModal'
import { useSignupModal } from '~/composables/modal/useSignupModal'

type Props = {
  mainImageAlt?: string
  calculateLabel?: string
  signupLabel?: string
}

withDefaults(defineProps<Props>(), {
  mainImageAlt: 'Фото',
  calculateLabel: 'Рассчитать стоимость',
  signupLabel: 'Записаться',
})

const { openSignupModal } = useSignupModal()
const { openRepairQuizModal } = useRepairQuizModal()

const quizProblems = getProblems()

const quizSymptoms: Readonly<Record<string, readonly string[]>> = getSymptoms()

const brands = getBrands()

const handleCalculateClick = (): void => {
  openRepairQuizModal({
    brands,
    problems: quizProblems,
    symptoms: quizSymptoms,
  })
}

const handleSignupClick = (): void => {
  openSignupModal('work')
}

const perks: PerkItem[] = [
  new PerkItem({
    id: 'diagnostic',
    title: 'Диагностика за 15 минут!',
    logo: new ItemImage({ source: '/images/perks/car.svg', alt: 'diagnostic' }),
  }),
  new PerkItem({
    id: 'truck',
    title: 'Бесплатный эвакуатор!',
    logo: new ItemImage({ source: '/images/perks/truck.svg', alt: 'truck' }),
  }),
  new PerkItem({
    id: 'float',
    title: 'Гарантия сроком на 1 год!',
    logo: new ItemImage({ source: '/images/perks/float.svg', alt: 'float' }),
  }),
]
</script>

<template>
  <TwoColumns inverse class="gap-1 lg:gap-20">
    <NuxtImg src="/images/transmission.png" alt="transmission" class="h-85 w-full object-contain" />

    <div class="space-y-10">
      <div class="hidden space-y-4 lg:block">
        <CenteredTitle>Почему клиенты выбирают нас</CenteredTitle>
        <span class="text-brand-grey block w-full text-center text-sm">
          даже рассмотрев все предложения на рынке
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
