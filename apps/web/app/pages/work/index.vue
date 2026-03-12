<script setup lang="ts">
import type { ImageCardItem } from '#shared/types/entity'

import { PAGE_LABELS } from '#shared/constants/page-labels'
import { computed } from 'vue'

import { useSimplePagePresentation } from '~/composables/useSimplePagePresentation'

const { data: casesData } = await useCases()

const caseCards = computed<ImageCardItem[]>(() => {
  const cases = casesData.value ?? []

  return cases.map((caseItem: CaseItem) => ({
    id: caseItem.id,
    name: caseItem.name ?? '',
    slug: `work/${caseItem.slug}`,
    image_source: caseItem.image_source,
    image_alt: caseItem.image_alt ?? '',
    date: caseItem.case_date,
  }))
})

const pageTitle = computed<string>(() => PAGE_LABELS.cases)
const pageDescription = computed<string>(
  () =>
    'Реальные кейсы по ремонту АКПП: симптомы, выполненные работы, стоимость ремонта и результат по конкретным автомобилям.'
)

useSimplePagePresentation({
  title: pageTitle,
  description: pageDescription,
  baseItems: computed(() => [{ name: 'Главная', slug: '/' }]),
})
</script>

<template>
  <Breadcrumbs />
  <ImageCardGrid :items="caseCards" />
</template>
