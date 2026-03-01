<script setup lang="ts">
import { computed, ref } from 'vue'

type GalleryImage = {
  src: string
  alt: string
}

type CaseDetails = {
  transmission: string
  year: number | string
  engineVolume: number | string
  mileage: number | string
  reason: string
}

type Costs = {
  partsRub: number
  laborRub: number
  totalRub?: number
}

type Props = {
  mainImageAlt?: string
  images: readonly GalleryImage[]
  details: CaseDetails
  works: readonly string[]
  costs: Costs
  calculateLabel?: string
  signupLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  mainImageAlt: 'Фото автомобиля',
  calculateLabel: 'Рассчитать стоимость',
  signupLabel: 'Записаться',
})

const emit = defineEmits<{
  (event: 'selectImage', payload: { index: number; image: GalleryImage }): void
}>()

const selectedImageIndex = ref(0)

const selectedImage = computed<GalleryImage | null>(() => {
  return props.images[selectedImageIndex.value] ?? null
})

const totalRub = computed<number>(() => {
  return props.costs.totalRub ?? props.costs.partsRub + props.costs.laborRub
})

const handleSelectImage = (index: number): void => {
  const image = props.images[index]
  if (!image) {
    return
  }

  selectedImageIndex.value = index
  emit('selectImage', { index, image })
}

const quizProblems = getProblems()

const quizSymptoms: Readonly<Record<string, readonly string[]>> = getSymptoms()

const brands = getBrands()

import { getBrands } from '#server/api/brands/brands.get'
import { getProblems, getSymptoms } from '#server/api/quiz/quiz.get'
import { useRepairQuizModal } from '#shared/lib/modal/useRepairQuizModal'
import { useSignupModal } from '#shared/lib/modal/useSignupModal'

const { openSignupModal } = useSignupModal()
const { openRepairQuizModal } = useRepairQuizModal()

const handleCalculateClick = (): void => {
  openRepairQuizModal({
    brands,
    problems: quizProblems,
    symptoms: quizSymptoms,
  })
}

const handleSignupClick = (): void => {
  openSignupModal('work')
}
</script>

<template>
  <div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
    <div class="flex flex-col gap-4">
      <div class="border-brand-soft overflow-hidden rounded-xl border">
        <NuxtImg
          :src="selectedImage?.src ?? props.images[0]?.src ?? '/images/transmission.png'"
          :alt="selectedImage?.alt ?? props.mainImageAlt"
          class="h-105 w-full object-contain" />
      </div>

      <div class="flex gap-3 overflow-x-auto">
        <button
          v-for="(image, index) in props.images"
          :key="image.src + index"
          type="button"
          class="border-brand-soft hover:border-brand-red cursor-pointer overflow-hidden rounded-lg border transition-colors"
          :class="index === selectedImageIndex ? 'border-brand-red' : ''"
          @click="handleSelectImage(index)">
          <NuxtImg :src="image.src" :alt="image.alt" class="h-20 w-28 object-contain" />
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <div class="text-brand-grey space-y-3 text-base">
        <p>
          <span class="text-brand-dark font-bold">АКПП:</span>
          {{ props.details.transmission }}
        </p>
        <p>
          <span class="text-brand-dark font-bold">Год выпуска:</span>
          {{ props.details.year }}
        </p>
        <p>
          <span class="text-brand-dark font-bold">Объем двигателя:</span>
          {{ props.details.engineVolume }}
        </p>
        <p>
          <span class="text-brand-dark font-bold">Пробег:</span>
          {{ props.details.mileage }}
        </p>
        <p>
          <span class="text-brand-dark font-bold">Причина обращения:</span>
          {{ props.details.reason }}
        </p>
      </div>

      <div v-if="props.works.length > 0" class="space-y-3">
        <p class="text-brand-dark text-base font-bold">Проведенные работы:</p>

        <ul class="text-brand-grey list-disc space-y-2 pl-5 text-base">
          <li v-for="workTitle in props.works" :key="workTitle">
            {{ workTitle }}
          </li>
        </ul>
      </div>

      <div class="grid grid-cols-3 gap-6 py-6">
        <div class="flex flex-col items-center gap-2 text-center">
          <NuxtImg
            src="/images/icons/cog.svg"
            alt="cog"
            sizes="(max-width: 1023px) 28px, 35px"
            class="h-7 w-7 shrink-0 object-contain lg:h-8.75 lg:w-8.75" />

          <p class="text-brand-dark text-lg font-bold">{{ props.costs.partsRub }} руб.</p>
          <p class="text-brand-grey-light text-xs">Запчасти</p>
        </div>

        <div class="flex flex-col items-center gap-2 text-center">
          <NuxtImg
            src="/images/icons/wrench.svg"
            alt="wrench"
            sizes="(max-width: 1023px) 28px, 35px"
            class="h-7 w-7 shrink-0 object-contain lg:h-8.75 lg:w-8.75" />

          <p class="text-brand-dark text-lg font-bold">{{ props.costs.laborRub }} руб.</p>
          <p class="text-brand-grey-light text-xs">Работа</p>
        </div>

        <div class="flex flex-col items-center gap-2 text-center">
          <NuxtImg
            src="/images/icons/calc.svg"
            alt="calc"
            sizes="(max-width: 1023px) 28px, 35px"
            class="h-7 w-7 shrink-0 object-contain lg:h-8.75 lg:w-8.75" />

          <p class="text-brand-dark text-lg font-bold">{{ totalRub }} руб.</p>
          <p class="text-brand-grey-light text-xs">Общая сумма</p>
        </div>
      </div>

      <div class="mt-4 flex flex-col gap-4 sm:flex-row">
        <MainButton @click="handleCalculateClick">
          {{ props.calculateLabel }}
        </MainButton>

        <MainButton
          @click="handleSignupClick"
          class="bg-brand-grey text-brand-white relative w-full overflow-hidden rounded-full border-0 py-5 text-2xl font-semibold transition hover:opacity-95">
          <span
            class="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.15)_25%,transparent_25%)]"></span>
          {{ props.signupLabel }}
        </MainButton>
      </div>
    </div>
  </div>
</template>
