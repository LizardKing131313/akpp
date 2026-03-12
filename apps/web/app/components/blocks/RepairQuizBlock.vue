<script setup lang="ts">
import type { QuizSubmitPayload } from '#shared/types/quiz'

import RepairQuiz from '~/components/quiz/RepairQuiz.vue'
import { useQuizSubmit } from '~/composables/useQuizSubmit'

const { submitQuiz } = useQuizSubmit()

const handleQuizSubmit = (payload: QuizSubmitPayload): void => {
  void submitQuiz(payload)
}
</script>

<template>
  <section class="relative">
    <div class="brand-gradient left-1/2 w-screen -translate-x-1/2" />

    <TwoColumns class="relative mx-auto grid max-w-6xl gap-2 lg:grid-cols-2">
      <CalculateBanner />

      <RepairQuiz class="w-full px-4 py-12" @submit="handleQuizSubmit" />
    </TwoColumns>
  </section>
</template>
