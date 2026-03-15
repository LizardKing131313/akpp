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
  <div class="w-full">
    <QuizStepTitle :title="title">
      {{ description }}
    </QuizStepTitle>

    <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <button
        v-for="contextTitle in props.contexts"
        :key="contextTitle"
        type="button"
        class="border-brand-grey-light/20 bg-brand-white hover:border-brand-red flex items-center gap-4 rounded-2xl border px-4 py-5 text-left transition-colors"
        :class="isSelected(contextTitle) ? 'border-brand-red' : ''"
        @click="toggleContext(contextTitle)">
        <span
          class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border"
          :class="
            isSelected(contextTitle)
              ? 'border-brand-red bg-brand-red'
              : 'border-brand-grey-light/40'
          ">
          <svg
            v-if="isSelected(contextTitle)"
            class="h-4 w-4 text-white"
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

        <span class="text-brand-dark text-xl leading-8 font-medium">
          {{ contextTitle }}
        </span>
      </button>
    </div>

    <div class="mt-8">
      <div class="text-brand-grey-light text-xl leading-8 font-bold">
        {{ customLabel }}
      </div>

      <textarea
        v-model.trim="customContextText"
        rows="3"
        class="border-brand-grey-light/20 text-brand-dark placeholder:text-brand-grey-light mt-3 w-full rounded-2xl border px-5 py-4 text-xl leading-8 outline-none"
        :placeholder="customPlaceholder" />
    </div>

    <MainButton @click="handleNext" class="mt-6 flex w-full items-center justify-center gap-3">
      {{ nextLabel }}
      <Arrow direction="right" class="text-brand-white" />
    </MainButton>
  </div>
</template>
