<script setup lang="ts">
import type { BrandItem } from '#shared/types/brand'
import type { QuizSubmitPayload } from '#shared/types/quiz'

import { cn } from '#shared/lib/cn'
import { computed, defineAsyncComponent } from 'vue'

import ModalClose from '~/components/modal/components/ModalClose.vue'
import { useQuizSubmit } from '~/composables/useQuizSubmit'

const AsyncRepairQuiz = defineAsyncComponent(() => import('~/components/quiz/RepairQuiz.vue'))

type QuizModalPayload = {
  readonly activeBrand?: BrandItem | null
}

const emit = defineEmits<{
  (event: 'close'): void
}>()

const emitClose = (): void => {
  emit('close')
}

const { submitQuiz } = useQuizSubmit({
  onSuccess: emitClose,
})

const handleQuizSubmit = (payload: QuizSubmitPayload): void => {
  void submitQuiz(payload)
}

const props = defineProps<{
  payload: QuizModalPayload | null
}>()

const activeBrand = computed<BrandItem | null>(() => {
  return props.payload?.activeBrand ?? null
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
      <component :is="AsyncRepairQuiz" :active-brand="activeBrand" @submit="handleQuizSubmit" />
    </div>
  </div>
</template>
