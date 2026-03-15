<script setup lang="ts">
import { computed, ref } from 'vue'

withDefaults(
  defineProps<{
    readonly problemTitle: string
    readonly symptoms: readonly string[]
    readonly title?: string
    readonly problemLabel?: string
    readonly emptyText?: string
    readonly customLabel?: string
    readonly customPlaceholder?: string
    readonly customButton?: string
  }>(),
  {
    title: 'Уточните симптомы',
    problemLabel: 'Проблема:',
    emptyText: 'Нет вариантов',
    customLabel: 'Свой вариант / другое:',
    customPlaceholder: 'Опишите своими словами',
    customButton: 'Далее',
  }
)

const emit = defineEmits<{
  (event: 'select', payload: { symptomTitle: string }): void
}>()

const customSymptomTitle = ref<string>('')

const isCustomSubmitDisabled = computed<boolean>(() => {
  return customSymptomTitle.value.trim().length === 0
})

const handleSelect = (symptomTitle: string): void => {
  emit('select', { symptomTitle })
}

const handleCustomSubmit = (): void => {
  const symptomTitle = customSymptomTitle.value.trim()

  if (symptomTitle.length === 0) {
    return
  }

  emit('select', { symptomTitle })
}
</script>

<template>
  <div class="w-full">
    <QuizStepTitle :title="title">
      {{ problemLabel }}
      <span class="text-brand-dark ml-2 font-semibold">{{ problemTitle }}</span>
    </QuizStepTitle>

    <QuizOptionList :items="symptoms" :empty-text="emptyText" @select="handleSelect" />

    <div class="border-brand-grey-light/20 mt-6 border-t pt-5">
      <div class="text-brand-grey-light text-sm leading-5 font-bold">
        {{ customLabel }}
      </div>

      <div
        class="border-brand-soft focus-within:border-brand-red mt-3 flex items-stretch overflow-hidden rounded-xl border transition-colors">
        <input
          v-model.trim="customSymptomTitle"
          type="text"
          class="text-brand-dark placeholder:text-brand-grey-light min-w-0 flex-1 bg-transparent px-4 py-2.5 text-base outline-none"
          :placeholder="customPlaceholder"
          @keydown.enter.prevent="handleCustomSubmit" />

        <button
          type="button"
          class="bg-brand-red hover:bg-brand-red-dark text-brand-white min-w-14 px-4 py-2.5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="isCustomSubmitDisabled"
          @click="handleCustomSubmit">
          {{ customButton }}
        </button>
      </div>
    </div>
  </div>
</template>
