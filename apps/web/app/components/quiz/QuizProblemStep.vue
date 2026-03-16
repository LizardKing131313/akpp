<script setup lang="ts">
import type { QuizProblemItem } from '#shared/types/quiz'

withDefaults(
  defineProps<{
    readonly brandTitle: string
    readonly problems: readonly QuizProblemItem[]
    readonly title?: string
    readonly description?: string
    readonly brandLabel?: string
    readonly emptyText?: string
  }>(),
  {
    title: 'Что случилось?',
    description: 'Выберите категорию неисправности',
    brandLabel: 'Автомобиль:',
    emptyText: 'Нет вариантов',
  }
)

const emit = defineEmits<{
  (event: 'select', payload: { problemTitle: string }): void
}>()

const handleSelect = (problemItem: QuizProblemItem): void => {
  emit('select', { problemTitle: problemItem.name ?? '' })
}
</script>

<template>
  <div class="w-full">
    <QuizStepTitle :title="title">
      <span v-if="description">{{ description }}</span>
      <template v-else>{{ brandLabel }}</template>
      <span
        class="bg-brand-red text-brand-white ml-2 inline-flex items-center rounded-md px-2 py-1 text-sm font-bold">
        {{ brandTitle }}
      </span>
    </QuizStepTitle>

    <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <button
        v-for="problemItem in problems"
        :key="problemItem.id"
        type="button"
        data-roistat-field="quiz_problem"
        :data-roistat-value="problemItem.name"
        class="border-brand-grey-light/20 bg-brand-white hover:border-brand-red flex min-h-34 flex-col items-center justify-center rounded-2xl border px-4 py-6 text-center transition-colors"
        @click="handleSelect(problemItem)">
        <CmsImage
          v-if="problemItem.image_source"
          :src="problemItem.image_source"
          :alt="problemItem.image_alt ?? problemItem.name"
          width="40"
          height="40"
          class="h-10 w-10 object-contain text-[#6b7280]" />

        <span
          v-else
          class="bg-brand-soft/40 text-brand-grey-light flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold">
          !
        </span>

        <span class="text-brand-dark mt-5 text-[15px] leading-5.5 font-bold">
          {{ problemItem.name }}
        </span>
      </button>
    </div>

    <div v-if="problems.length === 0" class="text-brand-dark mt-5">
      {{ emptyText }}
    </div>
  </div>
</template>
