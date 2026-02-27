<script setup lang="ts">
import { computed, ref } from 'vue'

type BrandLike = {
  title: string
}

type QuizStep = 'brand' | 'problem' | 'symptom' | 'contact' | 'success'

type QuizSubmitPayload = {
  brandTitle: string
  problemTitle: string
  symptomTitle: string
  customerName: string
  customerPhone: string
}

const props = withDefaults(
  defineProps<{
    brands: readonly BrandLike[]
    problems: readonly string[]
    symptoms: Readonly<Record<string, readonly string[]>>
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

const stepLabels = ['МАРКА', 'ПРОБЛЕМА', 'СИМПТОМЫ', 'РАСЧЕТ'] as const

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
  <section class="w-full px-4 py-12">
    <div
      class="bg-brand-white relative mx-auto w-full max-w-140 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]">
      <div v-if="currentStep !== 'success'" class="px-7.5 pt-7.5">
        <div class="grid grid-cols-4 gap-x-5">
          <div v-for="(label, labelIndex) in stepLabels" :key="label" class="min-w-0">
            <div
              class="h-1.25 w-full rounded-full transition-colors"
              :class="labelIndex <= activeStepIndex ? 'bg-brand-red' : 'bg-brand-soft'" />

            <div
              class="mt-2 truncate text-center text-[10px] leading-3.75 font-bold tracking-[0.5px] uppercase transition-colors"
              :class="labelIndex === activeStepIndex ? 'text-brand-dark' : 'text-brand-grey-light'">
              {{ label }}
            </div>
          </div>
        </div>
      </div>

      <button
        v-if="canGoBack"
        type="button"
        class="text-brand-grey-light hover:text-brand-dark group absolute top-16 left-7.5 inline-flex items-center gap-2 text-sm text-[10px] leading-3.75 font-bold tracking-[0.5px] uppercase transition-colors"
        @click="goBack">
        <Arrow
          direction="left"
          class="text-brand-grey-light group-hover:text-brand-dark! h-4 w-4"
          aria-hidden="true" />
        Назад
      </button>

      <div class="p-7.5">
        <QuizBrandStep v-if="currentStep === 'brand'" :brands="brands" @next="handleBrandNext" />

        <QuizProblemStep
          v-else-if="currentStep === 'problem'"
          :brand-title="selectedBrandTitle"
          :problems="problems"
          @select="handleProblemSelect" />

        <QuizSymptomsStep
          v-else-if="currentStep === 'symptom'"
          :problem-title="selectedProblemTitle"
          :symptoms="availableSymptoms"
          @select="handleSymptomSelect" />

        <QuizContactStep
          v-else-if="currentStep === 'contact'"
          :brand-title="selectedBrandTitle"
          :problem-title="selectedProblemTitle"
          :symptom-title="selectedSymptomTitle"
          @edit="goToBrandAndReset"
          @submit="handleContactSubmit" />

        <QuizSuccessStep v-else-if="currentStep === 'success'" />
      </div>
    </div>
  </section>
</template>
