<script setup lang="ts">
import { PAGE_LABELS } from '#shared/constants/page-labels'
import { computed } from 'vue'

import { useSimplePagePresentation } from '~/composables/useSimplePagePresentation'

const route = useRoute()
const caseSlug = computed<string>(() => String(route.params.id ?? '').trim())

const { data: caseData } = await useCaseBySlug(caseSlug)
const pageTitle = computed<string>(() => caseData.value?.name ?? PAGE_LABELS.case)

useSimplePagePresentation({
  title: pageTitle,
  description: pageTitle,
  baseItems: computed(() => [
    { name: 'Главная', slug: '/' },
    { name: PAGE_LABELS.cases, slug: '/work' },
  ]),
})
</script>

<template>
  <CaseItem v-if="caseData" :caseItem="caseData" />
</template>
