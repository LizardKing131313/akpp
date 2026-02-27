<script setup lang="ts">
import { cn } from '#shared/lib/cn'

type BrandLike = {
  title: string
}

type QuizModalPayload = {
  brands: readonly BrandLike[]
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
    <button
      type="button"
      :class="
        cn(`
          text-brand-grey hover:text-brand-grey-light absolute top-3
          right-3 grid h-9 w-9 place-items-center rounded-full transition
          sm:top-5 sm:right-5 sm:h-10 sm:w-10
        `)
      "
      aria-label="Закрыть окно"
      @click="emitClose">
      <span class="text-2xl leading-none">×</span>
    </button>

    <div
      class="max-h-[85svh] overflow-y-auto px-5 pt-7 pb-6 sm:max-h-none sm:px-8 sm:pt-10 sm:pb-8">
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
