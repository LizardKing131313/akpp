<script setup lang="ts">
import { useSignupModal } from '#shared/lib/modal/useSignupModal'

interface ProductCardProps {
  title: string
  description: string
  price: string
  imageSrc: string
  imageAlt: string
}

defineProps<ProductCardProps>()

const { openSignupModal } = useSignupModal()
const handleClick = (): void => {
  openSignupModal('footer')
}
</script>

<template>
  <div
    class="bg-brand-white flex h-full w-full flex-col text-center shadow-[0_20px_30px_0_#2222220f]">
    <div
      class="mx-auto mb-6 flex h-37.5 w-37.5 items-center justify-center sm:mb-8 sm:h-50 sm:w-50">
      <NuxtImg
        :src="imageSrc"
        :alt="imageAlt"
        sizes="(max-width: 640px) 150px, 200px"
        class="h-full w-full object-contain" />
    </div>

    <h3 class="text-brand-dark mb-4 text-2xl font-bold">
      {{ title }}
    </h3>

    <!-- ТЕКСТ РАСТЯГИВАЕМ -->
    <div class="flex flex-1 flex-col">
      <p class="text-brand-grey-light mb-4 text-sm leading-relaxed">
        {{ description }}
      </p>

      <!-- DIVIDER УХОДИТ ВНИЗ -->
      <div class="bg-brand-soft/70 mt-auto h-px w-full"></div>
    </div>

    <!-- НИЗ -->
    <div class="mt-4 flex flex-col items-center">
      <div
        class="bg-brand-red text-brand-white mx-auto mb-2 inline-block rounded-full px-8 py-1 text-[16px] font-bold">
        {{ price }}
      </div>

      <button
        type="button"
        @click="handleClick"
        class="border-brand-red text-brand-red hover:bg-brand-red hover:text-brand-white w-full rounded-full border py-2 text-[16px] leading-6 font-bold transition-colors">
        Купить
      </button>
    </div>
  </div>
</template>
