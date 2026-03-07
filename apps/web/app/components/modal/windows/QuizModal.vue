<script setup lang="ts">
import type { QuizModalPayload, QuizSubmitPayload } from '#shared/types/quiz'

import { cn } from '#shared/lib/cn'
import { computed, ref } from 'vue'

import ModalClose from '~/components/modal/components/ModalClose.vue'
import { useLeadSubmit } from '~/composables/useLeadSubmit'

const emit = defineEmits<{
  (event: 'close'): void
}>()

const emitClose = (): void => {
  emit('close')
}

const isSubmitting = ref<boolean>(false)

const { submitLead } = useLeadSubmit()

const handleQuizSubmit = (payload: QuizSubmitPayload): void => {
  if (isSubmitting.value) return

  void (async () => {
    isSubmitting.value = true

    try {
      await submitLead({
        source: 'quiz',
        name: payload.customerName,
        phone: payload.customerPhone,
        problem: payload.problemTitle,
        symptoms: payload.symptomTitle,
        comment: `Марка: ${payload.brandTitle}`,
      })

      emitClose()
    } catch {
      console.error('[lead] quiz submit failed')
    } finally {
      isSubmitting.value = false
    }
  })()
}

const props = defineProps<{
  payload: QuizModalPayload | null
}>()

const { data: brandsData } = await useBrands()
const { data: quizData } = await useQuizData()

const resolvedPayload = computed<QuizModalPayload | null>(() => {
  if (props.payload !== null) {
    return props.payload
  }

  const problems = quizData.value?.problems ?? []
  const symptoms = quizData.value?.symptoms ?? {}

  if (problems.length === 0) {
    return null
  }

  return {
    brands: brandsData.value ?? [],
    problems,
    symptoms,
  }
})
</script>

<template>
  <div
    :class="
      cn(`
        bg-brand-white relative w-full max-w-4xl
        overflow-hidden rounded-2xl shadow-2xl sm:rounded-[28px]
      `)
    ">
    <ModalClose @click="emitClose" />

    <div class="mt-12 max-h-[85svh] overflow-y-auto sm:max-h-none">
      <RepairQuiz
        v-if="resolvedPayload !== null"
        :brands="resolvedPayload.brands"
        :problems="resolvedPayload.problems"
        :symptoms="resolvedPayload.symptoms"
        @submit="handleQuizSubmit" />

      <div v-else class="text-brand-grey-light py-10 text-center text-sm">Нет данных для квиза</div>
    </div>
  </div>
</template>
