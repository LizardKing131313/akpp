<script setup lang="ts">
import type { BrandItem } from '#shared/types/brand'
import type { QuizSubmitPayload, QuizSymptomsMap } from '#shared/types/quiz'

import { cn } from '#shared/lib/cn'
import { computed, ref } from 'vue'

import { useQuizUiSettings } from '~/composables/useQuizUiSettings'

type QuizStep = 'brand' | 'problem' | 'symptom' | 'contact' | 'success'

const props = withDefaults(
  defineProps<{
    brands: readonly BrandItem[]
    problems: readonly string[]
    symptoms: QuizSymptomsMap
    initialStep?: QuizStep
  }>(),
  {
    initialStep: 'brand',
  }
)

const emit = defineEmits<{
  (event: 'submit', payload: QuizSubmitPayload): void
}>()

const currentStep = ref<QuizStep>(props.initialStep)

const selectedBrandTitle = ref<string>('')
const selectedProblemTitle = ref<string>('')
const selectedSymptomTitle = ref<string>('')

const settings = useQuizUiSettings()

const stepLabels = computed<readonly string[]>(() => [
  settings.value.step_label_brand,
  settings.value.step_label_problem,
  settings.value.step_label_symptom,
  settings.value.step_label_contact,
])

const activeStepIndex = computed<number>(() => {
  if (currentStep.value === 'brand') return 0
  if (currentStep.value === 'problem') return 1
  if (currentStep.value === 'symptom') return 2
  return 3
})

const canGoBack = computed<boolean>(
  () => currentStep.value !== 'brand' && currentStep.value !== 'success'
)

const goBack = (): void => {
  if (!canGoBack.value) return

  if (currentStep.value === 'problem') {
    currentStep.value = 'brand'
    selectedProblemTitle.value = ''
    selectedSymptomTitle.value = ''
    return
  }

  if (currentStep.value === 'symptom') {
    currentStep.value = 'problem'
    selectedSymptomTitle.value = ''
    return
  }

  if (currentStep.value === 'contact') {
    currentStep.value = 'symptom'
  }
}

const goToBrandAndReset = (): void => {
  currentStep.value = 'brand'
  selectedBrandTitle.value = ''
  selectedProblemTitle.value = ''
  selectedSymptomTitle.value = ''
}

const handleBrandNext = (payload: { brandTitle: string }): void => {
  selectedBrandTitle.value = payload.brandTitle
  currentStep.value = 'problem'
}

const handleProblemSelect = (payload: { problemTitle: string }): void => {
  selectedProblemTitle.value = payload.problemTitle
  selectedSymptomTitle.value = ''
  currentStep.value = 'symptom'
}

const availableSymptoms = computed<readonly string[]>(() => {
  const list = props.symptoms[selectedProblemTitle.value]
  return list ?? []
})

const handleSymptomSelect = (payload: { symptomTitle: string }): void => {
  selectedSymptomTitle.value = payload.symptomTitle
  currentStep.value = 'contact'
}

const handleContactSubmit = (payload: { customerName: string; customerPhone: string }): void => {
  emit('submit', {
    brandTitle: selectedBrandTitle.value,
    problemTitle: selectedProblemTitle.value,
    symptomTitle: selectedSymptomTitle.value,
    customerName: payload.customerName,
    customerPhone: payload.customerPhone,
  })

  currentStep.value = 'success'
}
</script>

<template>
  <section>
    <div
      class="bg-brand-white relative mx-auto w-full max-w-140 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]">
      <div v-if="currentStep !== 'success'" class="px-7.5 pt-7.5">
        <div class="grid grid-cols-4 gap-x-5">
          <div v-for="(label, labelIndex) in stepLabels" :key="label" class="min-w-0">
            <div
              class="h-1.25 w-full rounded-full transition-colors"
              :class="labelIndex <= activeStepIndex ? 'bg-brand-red' : 'bg-brand-soft'" />

            <div
              class="mt-2 hidden truncate text-center text-[10px] leading-3.75 font-bold tracking-[0.5px] uppercase transition-colors md:block"
              :class="labelIndex === activeStepIndex ? 'text-brand-dark' : 'text-brand-grey-light'">
              {{ label }}
            </div>
          </div>
        </div>
      </div>

      <button
        v-if="canGoBack"
        type="button"
        :class="
          cn(`
            text-brand-grey-light hover:text-brand-dark group absolute top-12 left-7.5
            inline-flex items-center gap-2 text-sm text-[10px] leading-3.75
            font-bold tracking-[0.5px] uppercase transition-colors md:top-16
          `)
        "
        @click="goBack">
        <Arrow
          direction="left"
          class="text-brand-grey-light group-hover:text-brand-dark! h-4 w-4"
          aria-hidden="true" />
        {{ settings.back_label }}
      </button>

      <div class="p-7.5">
        <QuizBrandStep
          v-if="currentStep === 'brand'"
          :brands="brands"
          :title="settings.brand_title"
          :description="settings.brand_description"
          :input-placeholder="settings.brand_input_placeholder"
          :next-label="settings.brand_next_label"
          :popular-label="settings.brand_popular_label"
          :empty-label="settings.brand_empty_label"
          @next="handleBrandNext" />

        <QuizProblemStep
          v-else-if="currentStep === 'problem'"
          :brand-title="selectedBrandTitle"
          :problems="problems"
          :title="settings.problem_title"
          :brand-label="settings.problem_badge_label"
          :empty-text="settings.options_empty_text"
          @select="handleProblemSelect" />

        <QuizSymptomsStep
          v-else-if="currentStep === 'symptom'"
          :problem-title="selectedProblemTitle"
          :symptoms="availableSymptoms"
          :title="settings.symptom_title"
          :problem-label="settings.symptom_badge_label"
          :empty-text="settings.options_empty_text"
          @select="handleSymptomSelect" />

        <QuizContactStep
          v-else-if="currentStep === 'contact'"
          :brand-title="selectedBrandTitle"
          :problem-title="selectedProblemTitle"
          :symptom-title="selectedSymptomTitle"
          :title="settings.contact_title"
          :description="settings.contact_description"
          :auto-label="settings.contact_auto_label"
          :problem-label="settings.contact_problem_label"
          :name-label="settings.contact_name_label"
          :name-placeholder="settings.contact_name_placeholder"
          :submit-label="settings.contact_submit_label"
          @edit="goToBrandAndReset"
          @submit="handleContactSubmit" />

        <QuizSuccessStep
          v-else-if="currentStep === 'success'"
          :title="settings.success_title"
          :line1="settings.success_line_1"
          :line2="settings.success_line_2" />
      </div>
    </div>
  </section>
</template>
