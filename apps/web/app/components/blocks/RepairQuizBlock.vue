<script setup lang="ts">
import type { BrandItem } from '#shared/types/brand'

import { getProblems, getSymptoms } from '#server/api/quiz/quiz.get'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    brands?: readonly BrandItem[]
  }>(),
  {
    brands: () => [],
  }
)

const { data: brandsData } = await useBrands()

const resolvedBrands = computed<readonly BrandItem[]>(() => {
  if (props.brands.length > 0) {
    return props.brands
  }

  return brandsData.value ?? []
})

const quizProblems = getProblems()

const quizSymptoms: Readonly<Record<string, readonly string[]>> = getSymptoms()

const handleQuizSubmit = (payload: {
  brandTitle: string
  problemTitle: string
  symptomTitle: string
  customerName: string
  customerPhone: string
}): void => {
  // eslint-disable-next-line no-console
  console.log('Quiz submit payload:', payload)

  // здесь потом будет твой fetch / axios
}
</script>

<template>
  <section class="relative">
    <div class="brand-gradient left-1/2 w-screen -translate-x-1/2" />

    <TwoColumns class="relative mx-auto grid max-w-6xl gap-2 lg:grid-cols-2">
      <CalculateBanner />

      <RepairQuiz
        class="w-full px-4 py-12"
        :brands="resolvedBrands"
        :problems="quizProblems"
        :symptoms="quizSymptoms"
        @submit="handleQuizSubmit" />
    </TwoColumns>
  </section>
</template>
