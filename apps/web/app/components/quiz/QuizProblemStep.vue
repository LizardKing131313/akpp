<script setup lang="ts">
import type { QuizProblemItem } from '#shared/types/quiz'

const props = withDefaults(
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
  <div class="flex h-full w-full flex-col">
    <QuizStepTitle :title="props.title">
      <span v-if="props.description">{{ props.description }}</span>
      <template v-else>{{ props.brandLabel }}</template>
      <span
        class="bg-brand-red text-brand-white ml-2 inline-flex items-center rounded-md px-2 py-1 text-sm font-bold">
        {{ props.brandTitle }}
      </span>
    </QuizStepTitle>

    <div class="scrollbar-thin mt-5 min-h-0 flex-1 overflow-y-auto [scrollbar-gutter:stable]">
      <div v-if="props.problems.length > 0" class="space-y-4">
        <button
          v-for="problemItem in props.problems"
          :key="problemItem.id"
          type="button"
          data-roistat-field="quiz_problem"
          :data-roistat-value="problemItem.name"
          class="border-brand-grey-light/20 bg-brand-white hover:border-brand-red group flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-colors"
          @click="handleSelect(problemItem)">
          <span class="flex min-w-0 items-center gap-3">
            <CmsImage
              v-if="problemItem.image_source"
              :src="problemItem.image_source"
              :alt="problemItem.image_alt ?? problemItem.name"
              width="20"
              height="20"
              class="h-5 w-5 shrink-0 object-contain text-[#6b7280]" />

            <span
              v-else
              class="bg-brand-soft/40 text-brand-grey-light flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
              !
            </span>

            <span class="text-brand-dark truncate text-sm font-bold">
              {{ problemItem.name }}
            </span>
          </span>

          <Arrow
            direction="right"
            class="text-brand-dark group-hover:text-brand-red shrink-0"
            aria-hidden="true" />
        </button>
      </div>

      <div v-else class="text-brand-dark mt-5">
        {{ props.emptyText }}
      </div>
    </div>
  </div>
</template>
