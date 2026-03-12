<script setup lang="ts">
import { PAGE_LABELS } from '#shared/constants/page-labels'
import { computed } from 'vue'

import { useSimplePagePresentation } from '~/composables/useSimplePagePresentation'

const pageTitle = computed<string>(() => PAGE_LABELS.saleTransmission)
const pageDescription = computed<string>(
  () =>
    'Продажа АКПП с подбором по автомобилю. В наличии популярные коробки передач, консультация специалистов и помощь с выбором.'
)

useSimplePagePresentation({
  title: pageTitle,
  description: pageDescription,
  baseItems: computed(() => [{ name: 'Главная', slug: '/' }]),
})
</script>

<template>
  <Breadcrumbs />
  <ShopSection />
</template>
