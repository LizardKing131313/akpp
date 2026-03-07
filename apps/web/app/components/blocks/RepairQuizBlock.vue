<script setup lang="ts">
import type { BrandItem } from '#shared/types/brand'
import type { QuizSubmitPayload, QuizSymptomsMap } from '#shared/types/quiz'

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
const { data: quizData } = await useQuizData()

const resolvedBrands = computed<readonly BrandItem[]>(() => {
  if (props.brands.length > 0) {
    return props.brands
  }

  return brandsData.value ?? []
})

const quizProblems = computed<readonly string[]>(() => {
  return quizData.value?.problems ?? []
})

const quizSymptoms = computed<QuizSymptomsMap>(() => {
  return quizData.value?.symptoms ?? {}
})

const handleQuizSubmit = (payload: QuizSubmitPayload): void => {
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
