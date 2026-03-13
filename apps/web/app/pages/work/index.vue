<script setup lang="ts">
import { PAGE_LABELS } from '#shared/constants/page-labels'
import { computed } from 'vue'

import { useSimplePagePresentation } from '~/composables/useSimplePagePresentation'

const { data: casesData } = await useCases()
const route = useRoute()
const casesPerPage = 9

const totalPages = computed<number>(() => {
  const itemsCount = casesData.value?.length ?? 0
  return Math.max(1, Math.ceil(itemsCount / casesPerPage))
})

const currentPage = computed<number>(() => {
  const rawValue = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page
  const parsedValue = Number.parseInt(String(rawValue ?? '1'), 10)

  if (!Number.isFinite(parsedValue) || parsedValue < 1) {
    return 1
  }

  return Math.min(parsedValue, totalPages.value)
})

const caseCards = computed<CaseItem[]>(() => {
  const items = casesData.value ?? []
  const startIndex = (currentPage.value - 1) * casesPerPage

  return items.slice(startIndex, startIndex + casesPerPage)
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
  <Section>
    <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
      <CaseGridCard v-for="caseItem in caseCards" :key="caseItem.id" :caseItem />
    </div>

    <AppPagination base-path="/work" :current-page="currentPage" :total-pages="totalPages" />
  </Section>
</template>
