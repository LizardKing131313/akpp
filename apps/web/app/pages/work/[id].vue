<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const caseSlug = computed<string>(() => String(route.params.id ?? '').trim())

const { data: caseData } = await useCaseBySlug(caseSlug)
const pageTitle = computed<string>(() => caseData.value?.name ?? 'Работа')

usePageEntityBreadcrumbs({
  title: pageTitle,
  baseItems: computed(() => [
    { name: 'Главная', slug: '/' },
    { name: 'Наши работы', slug: '/work' },
  ]),
})
</script>

<template>
  <CaseItem v-if="caseData" :caseItem="caseData" />
</template>
