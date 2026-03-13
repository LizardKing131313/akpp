<script setup lang="ts">
import { PAGE_LABELS } from '#shared/constants/page-labels'
import { computed } from 'vue'

import { useSimplePagePresentation } from '~/composables/useSimplePagePresentation'

const { data: casesData } = await useCases()

const caseCards = computed<CaseItem[]>(() => {
  return casesData.value ?? []
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
  </Section>
</template>
