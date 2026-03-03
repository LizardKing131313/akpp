<script setup lang="ts">
import { useShopModal } from '~/composables/modal/useShopModal'

interface ProductCardProps {
  title: string
  description: string
  price: string
  imageSrc: string
  imageAlt: string
}

defineProps<ProductCardProps>()

const { openShopModal } = useShopModal()
const handleClick = (): void => {
  openShopModal('shop')
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

    <div class="flex flex-1 flex-col">
      <p class="text-brand-grey-light mb-4 text-sm leading-relaxed">
        {{ description }}
      </p>

      <div class="bg-brand-soft/70 mt-auto h-px w-full"></div>
    </div>

    <div class="mt-4 flex flex-col items-center">
      <div
        class="bg-brand-red text-brand-white mx-auto mb-2 inline-block rounded-full px-8 py-1 text-[16px] font-bold">
        {{ price }}
      </div>

      <MainButton reverse class="py-2" @click="handleClick">Купить</MainButton>
    </div>
  </div>
</template>
