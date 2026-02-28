<script setup lang="ts">
import type { BrandItem } from '#shared/types/components/brand'

import { getBrands } from '#server/api/brands/brands.get'
import { computed, ref } from 'vue'

interface BrandsGridProps {
  title?: string
  brands?: BrandItem[]
}

const props = withDefaults(defineProps<BrandsGridProps>(), {
  title: 'Выберите марку автомобиля',
  brands: getBrands,
})

const isExpanded = ref<boolean>(false)
const initialMobileCount = 9

const sectionRef = ref<HTMLElement | null>(null)

const mobileBrands = computed<BrandItem[]>(() => {
  if (isExpanded.value) return props.brands
  return props.brands.slice(0, initialMobileCount)
})

const shouldShowToggleButton = computed<boolean>(() => {
  return props.brands.length > initialMobileCount
})

const toggle = async (): Promise<void> => {
  isExpanded.value = !isExpanded.value

  if (!isExpanded.value) {
    await nextTick()
    sectionRef.value?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}
</script>

<template>
  <section ref="sectionRef" class="w-full">
    <div class="border-brand-grey-light/20 bg-brand-white rounded-xl border p-4">
      <h3 class="text-brand-grey-light/50 text-xs font-bold tracking-wide uppercase">
        {{ title }}
      </h3>

      <div class="grid grid-cols-3 gap-8 sm:hidden">
        <BrandCard v-for="brand in mobileBrands" :key="brand.id" :brand="brand" />
      </div>

      <div v-if="shouldShowToggleButton" class="flex justify-center sm:hidden">
        <MainButton @click="toggle">
          {{ isExpanded ? 'Свернуть' : 'Показать еще' }}
        </MainButton>
      </div>

      <div class="hidden grid-cols-4 gap-4 sm:grid md:grid-cols-6 xl:grid-cols-8">
        <BrandCard v-for="brand in brands" :key="brand.id" :brand="brand" />
      </div>
    </div>
  </section>
</template>
