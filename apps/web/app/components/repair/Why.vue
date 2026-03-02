<script setup lang="ts">
import { getBrands } from '#server/api/brands/brands.get'
import { getProblems, getSymptoms } from '#server/api/quiz/quiz.get'
import { useRepairQuizModal } from '#shared/lib/modal/useRepairQuizModal'
import { useSignupModal } from '#shared/lib/modal/useSignupModal'
import { ItemImage } from '#shared/types/components/image'
import { PerkItem } from '#shared/types/components/perk'

type Props = {
  mainImageAlt?: string
  calculateLabel?: string
  signupLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
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
  <TwoColumns inverse>
    <NuxtImg src="/images/transmission.png" alt="transmission" class="h-85 w-full object-contain" />

    <div class="space-y-10">
      <div class="space-y-4">
        <CenteredTitle>Почему клиенты выбирают нас</CenteredTitle>
        <span class="text-brand-grey block w-full text-center text-sm">
          даже рассмотрев все предложения на рынке
        </span>
      </div>

      <div class="flex flex-col gap-4 sm:flex-row">
        <PerkCard v-for="perk in perks" :key="perk.id" :perk />
      </div>

      <div class="flex flex-col gap-4 sm:flex-row">
        <MainButton @click="handleCalculateClick">
          {{ props.calculateLabel }}
        </MainButton>

        <MainButton
          @click="handleSignupClick"
          class="bg-brand-grey text-brand-white relative w-full overflow-hidden rounded-full border-0 py-5 text-2xl font-semibold transition hover:opacity-95">
          <span
            class="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.15)_25%,transparent_25%)]"></span>
          {{ props.signupLabel }}
        </MainButton>
      </div>
    </div>
  </TwoColumns>
</template>
