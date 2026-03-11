<script setup lang="ts">
import type { BrandItem } from '#shared/types/brand'

import { normalizeAppPath } from '#shared/lib/route'
import { computed, ref } from 'vue'

interface BrandsGridProps {
  baseHref?: string
  title?: string
  brands?: BrandItem[]
  show?: string
  collapse?: string
}

const props = withDefaults(defineProps<BrandsGridProps>(), {
  baseHref: '',
  title: 'Выберите марку автомобиля',
  brands: () => [],
  show: 'Показать еще',
  collapse: 'Свернуть',
})

const { data: brandsData } = await useBrands()

const isExpanded = ref<boolean>(false)
const initialMobileCount = 9

const sectionRef = ref<HTMLElement | null>(null)

const resolvedBrands = computed<BrandItem[]>(() => {
  if (props.brands.length > 0) {
    return props.brands
  }

  return brandsData.value ?? []
})

const brandsWithTo = computed(() => {
  return resolvedBrands.value.map((brand) => ({
    ...brand,
    to: normalizeAppPath(`${props.baseHref}${brand.slug}`),
  }))
})

const mobileBrands = computed(() => {
  if (isExpanded.value) return brandsWithTo.value
  return brandsWithTo.value.slice(0, initialMobileCount)
})

const shouldShowToggleButton = computed<boolean>(() => {
  return resolvedBrands.value.length > initialMobileCount
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
        <SliderItem v-for="brand in brandsWithTo" :key="brand.id" v-bind="brand" />
      </div>
    </div>
  </section>
</template>
