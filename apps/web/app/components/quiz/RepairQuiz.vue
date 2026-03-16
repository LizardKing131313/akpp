<script setup lang="ts">
import type { BrandItem } from '#shared/types/brand'
import type { QuizContextItem, QuizProblemItem, QuizSubmitPayload } from '#shared/types/quiz'

import { cn } from '#shared/lib/cn'
import { computed, ref, watch } from 'vue'

import { useQuizSettings } from '~/composables/useRepoApi'

type QuizStep = 'brand' | 'problem' | 'symptom' | 'context' | 'contact' | 'success'

const props = withDefaults(
  defineProps<{
    activeBrand?: BrandItem | null
    initialStep?: QuizStep
  }>(),
  {
    activeBrand: null,
    initialStep: 'brand',
  }
)

const emit = defineEmits<{
  (event: 'submit', payload: QuizSubmitPayload): void
}>()

const currentStep = ref<QuizStep>(props.activeBrand ? 'problem' : props.initialStep)

const selectedBrandId = ref<string | undefined>(props.activeBrand?.id)
const selectedBrandTitle = ref<string>(props.activeBrand?.name ?? '')
const selectedProblemId = ref<string | undefined>(undefined)
const selectedProblemTitle = ref<string>('')
const selectedSymptomTitle = ref<string>('')
const selectedContextTitles = ref<string[]>([])
const customContextText = ref<string>('')

const { data: settingsData } = await useQuizSettings()
const settings = computed<QuizSettings>(() => settingsData.value ?? ({} as QuizSettings))

const { data: brandsData } = await useBrands()
const { data: problemItemsData } = await useQuizProblems(selectedBrandId)
const { data: symptomItemsData } = await useQuizSymptoms(selectedProblemId)
const { data: contextItemsData } = await useQuizContexts()

const normalizeTitle = (value: string | undefined): string => {
  return value?.trim().toLowerCase() ?? ''
}

const brands = computed<readonly BrandItem[]>(() => {
  return brandsData.value ?? []
})

const problems = computed<readonly QuizProblemItem[]>(() => {
  return (problemItemsData.value ?? []).filter((problemItem: QuizProblemItem) => {
    return (problemItem.name?.trim().length ?? 0) > 0
  })
})

const stepLabels = computed<readonly string[]>(() => {
  return [
    settings.value.step_label_brand,
    settings.value.step_label_problem,
    settings.value.step_label_symptom,
    'Контекст',
    settings.value.step_label_contact,
  ]
})

const activeStepIndex = computed<number>(() => {
  if (currentStep.value === 'brand') return 0
  if (currentStep.value === 'problem') return 1
  if (currentStep.value === 'symptom') return 2
  if (currentStep.value === 'context') return 3
  return 4
})

const canGoBack = computed<boolean>(
  () => currentStep.value !== 'brand' && currentStep.value !== 'success'
)

watch(
  () => props.activeBrand,
  (activeBrand) => {
    if (!activeBrand) {
      return
    }

    selectedBrandId.value = activeBrand.id
    selectedBrandTitle.value = activeBrand.name
    selectedProblemId.value = undefined
    selectedProblemTitle.value = ''
    selectedSymptomTitle.value = ''
    selectedContextTitles.value = []
    customContextText.value = ''
    currentStep.value = 'problem'
  }
)

const goBack = (): void => {
  if (!canGoBack.value) return

  if (currentStep.value === 'problem') {
    currentStep.value = 'brand'
    selectedBrandId.value = undefined
    selectedBrandTitle.value = ''
    selectedProblemId.value = undefined
    selectedProblemTitle.value = ''
    selectedSymptomTitle.value = ''
    selectedContextTitles.value = []
    customContextText.value = ''
    return
  }

  if (currentStep.value === 'symptom') {
    currentStep.value = 'problem'
    selectedSymptomTitle.value = ''
    selectedContextTitles.value = []
    customContextText.value = ''
    return
  }

  if (currentStep.value === 'context') {
    currentStep.value = 'symptom'
    return
  }

  if (currentStep.value === 'contact') {
    currentStep.value = 'context'
  }
}

const goToBrandAndReset = (): void => {
  currentStep.value = 'brand'
  selectedBrandId.value = undefined
  selectedBrandTitle.value = ''
  selectedProblemId.value = undefined
  selectedProblemTitle.value = ''
  selectedSymptomTitle.value = ''
  selectedContextTitles.value = []
  customContextText.value = ''
}

const handleBrandNext = (payload: { brandTitle: string }): void => {
  const brandTitle = payload.brandTitle.trim()
  const normalizedBrandTitle = normalizeTitle(brandTitle)
  const matchedBrand = brands.value.find((brandItem) => {
    return normalizeTitle(brandItem.name) === normalizedBrandTitle
  })

  selectedBrandId.value = matchedBrand?.id
  selectedBrandTitle.value = brandTitle
  selectedProblemId.value = undefined
  selectedProblemTitle.value = ''
  selectedSymptomTitle.value = ''
  selectedContextTitles.value = []
  customContextText.value = ''
  currentStep.value = 'problem'
}

const handleProblemSelect = (payload: { problemTitle: string }): void => {
  const problemTitle = payload.problemTitle.trim()
  const normalizedProblemTitle = normalizeTitle(problemTitle)
  const matchedProblem = (problemItemsData.value ?? []).find((problemItem: QuizProblemItem) => {
    return normalizeTitle(problemItem.name) === normalizedProblemTitle
  })

  selectedProblemId.value = matchedProblem?.id
  selectedProblemTitle.value = problemTitle
  selectedSymptomTitle.value = ''
  selectedContextTitles.value = []
  customContextText.value = ''
  currentStep.value = 'symptom'
}

const availableSymptoms = computed<readonly string[]>(() => {
  return (symptomItemsData.value ?? [])
    .map((symptomItem) => symptomItem.name?.trim() ?? '')
    .filter((symptomTitle) => symptomTitle.length > 0)
})

const availableContexts = computed<readonly string[]>(() => {
  return (contextItemsData.value ?? [])
    .map((contextItem: QuizContextItem) => contextItem.name?.trim() ?? '')
    .filter((contextTitle) => contextTitle.length > 0)
})

const contextSummary = computed<string>(() => {
  const normalizedCustomContextText = customContextText.value.trim()
  const parts = [selectedContextTitles.value.join(', '), normalizedCustomContextText].filter(
    (contextValue) => contextValue.length > 0
  )

  return parts.join('. ')
})

const handleSymptomSelect = (payload: { symptomTitle: string }): void => {
  selectedSymptomTitle.value = payload.symptomTitle.trim()
  selectedContextTitles.value = []
  customContextText.value = ''
  currentStep.value = 'context'
}

const handleContextNext = (payload: {
  selectedContextTitles: readonly string[]
  customContextText: string
}): void => {
  selectedContextTitles.value = [...payload.selectedContextTitles]
  customContextText.value = payload.customContextText.trim()
  currentStep.value = 'contact'
}

const handleContactSubmit = (payload: { customerName: string; customerPhone: string }): void => {
  emit('submit', {
    brandTitle: selectedBrandTitle.value,
    problemTitle: selectedProblemTitle.value,
    symptomTitle: selectedSymptomTitle.value,
    contextTitles: selectedContextTitles.value,
    contextText: customContextText.value.trim(),
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
        <div
          class="grid gap-x-5"
          :style="{ gridTemplateColumns: `repeat(${stepLabels.length}, minmax(0, 1fr))` }">
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

      <div class="flex h-[34rem] flex-col overflow-hidden p-7.5">
        <div class="h-full w-full max-w-[32rem]">
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
            :description="settings.problem_description"
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
            :custom-label="settings.symptom_custom_label"
            :custom-placeholder="settings.symptom_custom_placeholder"
            :custom-button="settings.symptom_custom_button"
            @select="handleSymptomSelect" />

          <QuizContextStep
            v-else-if="currentStep === 'context'"
            :contexts="availableContexts"
            :description="settings.context_label"
            :custom-label="settings.context_custom_label"
            :custom-placeholder="settings.context_custom_placeholder"
            :next-label="settings.context_next_button"
            @next="handleContextNext" />

          <QuizContactStep
            v-else-if="currentStep === 'contact'"
            :brand-title="selectedBrandTitle"
            :problem-title="selectedProblemTitle"
            :symptom-title="selectedSymptomTitle"
            :context-summary="contextSummary"
            :title="settings.contact_title"
            :description="settings.contact_description"
            :auto-label="settings.contact_auto_label"
            :problem-label="settings.contact_problem_label"
            :name-label="settings.contact_name_label"
            :name-placeholder="settings.contact_name_placeholder"
            :phoneLabel="settings.contact_phone_label"
            :phonePlaceholder="settings.contact_phone_placeholder"
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
    </div>
  </section>
</template>
