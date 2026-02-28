<script setup lang="ts">
import { cn } from '#shared/lib/cn'

defineProps<{
  pulse?: boolean
}>()

const quizProblems = getProblems()

const quizSymptoms: Readonly<Record<string, readonly string[]>> = getSymptoms()

const brands = getBrands()

import { getBrands } from '#server/api/brands/brands.get'
import { getProblems, getSymptoms } from '#server/api/quiz/quiz.get'
import { useRepairQuizModal } from '#shared/lib/modal/useRepairQuizModal'
//import { useSignupModal } from '#shared/lib/modal/useSignupModal'

//const { openSignupModal } = useSignupModal()
const { openRepairQuizModal } = useRepairQuizModal()

const handleClick = (): void => {
  //openSignupModal('footer')
  openRepairQuizModal({
    brands,
    problems: quizProblems,
    symptoms: quizSymptoms,
  })
}
</script>

<template>
  <button
    :class="
      cn(`
        bg-brand-red fixed right-6 bottom-6 z-50 hidden h-18.25 w-18.25 items-center
        justify-center rounded-full shadow-xl transition-transform
        duration-200 hover:scale-105 active:scale-95 lg:flex
      `)
    "
    @click="handleClick">
    <span
      v-if="pulse"
      class="bg-brand-red absolute inset-0 animate-ping rounded-full opacity-40"></span>
    <span
      v-if="pulse"
      class="bg-brand-red absolute inset-0 scale-110 animate-ping rounded-full opacity-20"></span>

    <NuxtImg
      src="/images/icons/telephone.svg"
      alt="Позвонить"
      width="28"
      height="28"
      class="relative h-7 w-7 shrink-0"
      loading="eager" />
  </button>
</template>
