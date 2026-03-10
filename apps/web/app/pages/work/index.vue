<script setup lang="ts">
import type { ImageCardItem } from '#shared/types/entity'

import { computed } from 'vue'

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

const pageTitle = computed<string>(() => 'Наши работы')

usePageEntityBreadcrumbs({
  title: pageTitle,
  baseItems: computed(() => [{ name: 'Главная', slug: '/' }]),
})
</script>

<template>
  <ImageCardGrid :items="caseCards" />
</template>
