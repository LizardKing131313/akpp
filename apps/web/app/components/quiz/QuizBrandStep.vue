<script setup lang="ts">
import type { BrandItem } from '#shared/types/brand'

import { cn } from '#shared/lib/cn'
import { computed, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    readonly brands: readonly BrandItem[]

    readonly title?: string
    readonly description?: string
    readonly inputPlaceholder?: string
    readonly nextLabel?: string
    readonly popularLabel?: string
    readonly emptyLabel?: string
  }>(),
  {
    title: 'Укажите марку автомобиля',
    description: 'Введите вручную или выберите из списка популярных',
    inputPlaceholder: 'Введите марку (например: Dodge)...',
    nextLabel: 'Далее',
    popularLabel: 'Популярные марки:',
    emptyLabel: 'Ничего не найдено',
  }
)

const emit = defineEmits<{
  (event: 'next', payload: { brandTitle: string }): void
}>()

const inputValue = ref<string>('')
const debouncedQuery = ref<string>('')

let debounceTimerId: ReturnType<typeof setTimeout> | null = null

const normalizedQuery = computed<string>(() => debouncedQuery.value.trim().toLowerCase())

const filteredBrands = computed<readonly BrandItem[]>(() => {
  const queryValue = normalizedQuery.value

  if (queryValue.length === 0) {
    return props.brands
  }

  return props.brands.filter((brandItem) => brandItem.name?.toLowerCase().includes(queryValue))
})

const isNextDisabled = computed<boolean>(() => inputValue.value.trim().length === 0)

const handleSelectBrand = (brandTitle: string | undefined): void => {
  emit('next', { brandTitle: brandTitle ?? '' })
}

const handleNext = (): void => {
  const brandTitle = inputValue.value.trim()

  if (brandTitle.length === 0) {
    return
  }

  emit('next', { brandTitle })
}

watch(
  () => inputValue.value,
  (newValue) => {
    if (debounceTimerId !== null) {
      clearTimeout(debounceTimerId)
    }

    debounceTimerId = setTimeout(() => {
      debouncedQuery.value = newValue
      debounceTimerId = null
    }, 300)
  },
  { immediate: true }
)
</script>

<template>
  <div class="w-full space-y-5">
    <QuizStepTitle :title="props.title">
      {{ props.description }}
    </QuizStepTitle>

    <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        id="quiz-brand-input"
        name="quiz_brand"
        data-roistat-field="quiz_brand"
        v-model.trim="inputValue"
        type="text"
        class="bg-brand-white text-brand-dark focus:border-brand-red h-11.5 w-full rounded-xl px-5 text-lg outline-none"
        :aria-label="props.title"
        :placeholder="props.inputPlaceholder"
        autocomplete="off"
        @keydown.enter.prevent="handleNext" />

      <MainButton
        id="quiz-brand-next"
        data-roistat-step="brand_next"
        :disabled="isNextDisabled"
        @click="handleNext"
        class="w-auto px-8 py-2">
        {{ props.nextLabel }}
      </MainButton>
    </div>

    <div>
      <div class="text-brand-grey-light text-[13px] leading-5 font-bold tracking-wide uppercase">
        {{ props.popularLabel }}
      </div>

      <div class="mt-5">
        <div
          class="scrollbar-thin grid max-h-27.5 flex-1 grid-cols-1 gap-4 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
          <button
            v-for="brandItem in filteredBrands"
            :key="brandItem.name"
            type="button"
            :data-roistat-field="'quiz_brand_option'"
            :data-roistat-value="brandItem.name"
            :class="
              cn(`
                border-brand-grey-light/20 bg-brand-white text-brand-dark
                hover:text-brand-red hover:border-brand-red cursor-pointer rounded-xl
                border px-5 py-2 text-center text-[14px] leading-5.75 font-medium transition-colors
              `)
            "
            @click="handleSelectBrand(brandItem.name)">
            {{ brandItem.name }}
          </button>
        </div>

        <div
          v-if="filteredBrands.length === 0"
          class="text-brand-grey-light bg-brand-white text-base">
          {{ props.emptyLabel }}
        </div>
      </div>
    </div>
  </div>
</template>
