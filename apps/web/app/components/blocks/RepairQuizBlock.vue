<script setup lang="ts">
import type { BrandItem } from '#shared/types/components/brand'

import { getBrands } from '#server/api/brands/brands.get'
import { getProblems, getSymptoms } from '#server/api/quiz/quiz.get'
import { cn } from '#shared/lib/cn'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    brands?: readonly BrandItem[]
  }>(),
  {
    brands: getBrands,
  }
)

const quizBrands = computed(() =>
  props.brands.map((brandItem) => ({
    title: brandItem.title,
  }))
)

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
    <div
      :class="
        cn(
          `
            pointer-events-none absolute inset-y-0
            left-1/2 w-screen -translate-x-1/2
            bg-[radial-gradient(ellipse_80%_100%_at_center,#3C3C3C_0%,#222222_100%)]
            md:bg-[radial-gradient(ellipse_40%_100%_at_center,#3C3C3C_0%,#222222_100%)]
          `
        )
      " />

    <TwoColumns class="relative mx-auto grid max-w-6xl gap-2 lg:grid-cols-2">
      <CalculateBanner />

      <RepairQuiz
        class="w-full px-4 py-12"
        :brands="quizBrands"
        :problems="quizProblems"
        :symptoms="quizSymptoms"
        @submit="handleQuizSubmit" />
    </TwoColumns>
  </section>
</template>
