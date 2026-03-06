<script setup lang="ts">
import { cn } from '#shared/lib/cn'

import ModalClose from '~/components/modal/components/ModalClose.vue'

type QuizModalPayload = {
  brands: readonly BrandItem[]
  problems: readonly string[]
  symptoms: Readonly<Record<string, readonly string[]>>
} | null

defineProps<{
  payload: QuizModalPayload
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const emitClose = (): void => {
  emit('close')
}

const handleQuizSubmit = (): void => {
  emitClose()
}
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
        v-if="payload !== null"
        :brands="payload.brands"
        :problems="payload.problems"
        :symptoms="payload.symptoms"
        @submit="handleQuizSubmit" />

      <div v-else class="text-brand-grey-light py-10 text-center text-sm">Нет данных для квиза</div>
    </div>
  </div>
</template>
