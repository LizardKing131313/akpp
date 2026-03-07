<script setup lang="ts">
import type { ImageCardItem } from '#shared/types/entity'

import { computed } from 'vue'

definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    title: 'Примеры работ',
    backgroundSrc: '/images/breadcrumbs.jpg',
    items: [
      { label: 'Главная', to: '/' },
      { label: 'Примеры работ', to: '/work' },
    ],
  },
})

const { data: casesData } = await useCases()

const caseCards = computed<ImageCardItem[]>(() => {
  const cases = casesData.value ?? []

  return cases.map((caseItem) => ({
    id: caseItem.id,
    name: caseItem.name ?? '',
    slug: `/work/${caseItem.slug}`,
    image_source: caseItem.image_source,
    image_alt: caseItem.image_alt ?? '',
    date: caseItem.case_date,
  }))
})
</script>

<template>
  <ImageCardGrid :items="caseCards" />
</template>
