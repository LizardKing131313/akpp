<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    readonly contexts: readonly string[]
    readonly title?: string
    readonly description?: string
    readonly customLabel?: string
    readonly customPlaceholder?: string
    readonly nextLabel?: string
  }>(),
  {
    title: 'Когда это проявляется?',
    description: 'Отметьте условия (можно несколько)',
    customLabel: 'Дополнительная информация:',
    customPlaceholder: 'Опишите, когда это проявляется...',
    nextLabel: 'Далее',
  }
)

const emit = defineEmits<{
  (
    event: 'next',
    payload: {
      selectedContextTitles: readonly string[]
      customContextText: string
    }
  ): void
}>()

const selectedContextTitles = ref<string[]>([])
const customContextText = ref<string>('')

const normalizedSelectedContextTitles = computed<readonly string[]>(() => {
  return selectedContextTitles.value.filter((contextTitle) => contextTitle.trim().length > 0)
})

const toggleContext = (contextTitle: string): void => {
  const normalizedContextTitle = contextTitle.trim()

  if (normalizedContextTitle.length === 0) {
    return
  }

  const contextIndex = selectedContextTitles.value.findIndex(
    (selectedContextTitle) => selectedContextTitle === normalizedContextTitle
  )

  if (contextIndex >= 0) {
    selectedContextTitles.value.splice(contextIndex, 1)
    return
  }

  selectedContextTitles.value.push(normalizedContextTitle)
}

const isSelected = (contextTitle: string): boolean => {
  return selectedContextTitles.value.includes(contextTitle)
}

const handleNext = (): void => {
  emit('next', {
    selectedContextTitles: normalizedSelectedContextTitles.value,
    customContextText: customContextText.value.trim(),
  })
}
</script>

<template>
  <div class="flex h-full w-full flex-col">
    <QuizStepTitle :title="title">
      {{ description }}
    </QuizStepTitle>

    <div class="scrollbar-thin mt-5 min-h-0 flex-1 overflow-y-auto [scrollbar-gutter:stable]">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          v-for="contextTitle in props.contexts"
          :key="contextTitle"
          type="button"
          data-roistat-field="quiz_context_option"
          :data-roistat-value="contextTitle"
          class="border-brand-grey-light/20 bg-brand-white hover:border-brand-red flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-colors"
          :class="isSelected(contextTitle) ? 'border-brand-red' : ''"
          @click="toggleContext(contextTitle)">
          <span
            class="flex h-5 w-5 shrink-0 items-center justify-center rounded border"
            :class="
              isSelected(contextTitle)
                ? 'border-brand-red bg-brand-red'
                : 'border-brand-grey-light/40'
            ">
            <svg
              v-if="isSelected(contextTitle)"
              class="h-3 w-3 text-white"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true">
              <path
                d="M3.5 8.5L6.5 11.5L12.5 4.5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </span>

          <span class="text-brand-dark text-sm font-bold">
            {{ contextTitle }}
          </span>
        </button>
      </div>
    </div>

    <div class="mt-4">
      <div class="text-brand-grey-light text-sm leading-5 font-bold">
        {{ customLabel }}
      </div>

      <textarea
        id="quiz-context-custom-text"
        name="quiz_context_custom"
        data-roistat-field="quiz_context_custom"
        v-model.trim="customContextText"
        rows="2"
        class="border-brand-grey-light/20 text-brand-dark placeholder:text-brand-grey-light mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none"
        :placeholder="customPlaceholder" />
    </div>

    <MainButton
      id="quiz-context-next"
      data-roistat-step="context_next"
      @click="handleNext"
      class="mt-4 flex w-full items-center justify-center gap-2 py-2">
      {{ nextLabel }}
      <Arrow direction="right" class="text-brand-white" />
    </MainButton>
  </div>
</template>
