<script setup lang="ts">
import type { ImageCardItem } from '#shared/types/entity'

import { computed } from 'vue'

const routePageSettings = useRoutePageSettingsUi()

usePageEntityBreadcrumbs({
  title: () => routePageSettings.value.breadcrumb_work_label,
  baseItems: () => [{ name: routePageSettings.value.breadcrumb_home_label, slug: '/' }],
})

const { data: casesData } = await useCases()

const caseCards = computed<ImageCardItem[]>(() => {
  const cases = casesData.value ?? []

  return cases.map((caseItem: CaseItem) => ({
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
