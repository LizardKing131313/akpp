<script setup lang="ts">
import type { BrandItem } from '#shared/types/brand'

import { getBrands } from '#server/api/brands/index.get'
import { computed, ref } from 'vue'

interface BrandsGridProps {
  title?: string
  brands?: BrandItem[]
  show?: string
  collapse?: string
}

const props = withDefaults(defineProps<BrandsGridProps>(), {
  title: 'Выберите марку автомобиля',
  brands: getBrands,
  show: 'Показать еще',
  collapse: 'Свернуть',
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
        <SliderItem v-for="brand in mobileBrands" :key="brand.id" v-bind="brand" />
      </div>

      <div v-if="shouldShowToggleButton" class="flex justify-center sm:hidden">
        <MainButton @click="toggle">
          {{ isExpanded ? collapse : show }}
        </MainButton>
      </div>

      <div class="hidden grid-cols-4 gap-4 sm:grid md:grid-cols-6 xl:grid-cols-8">
        <SliderItem v-for="brand in brands" :key="brand.id" v-bind="brand" />
      </div>
    </div>
  </section>
</template>
