<script setup lang="ts">
import { computed } from 'vue'

definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    breadcrumb: 'Пример работы',
    breadcrumbs: [
      { name: 'Главная', slug: '/' },
      { name: 'Примеры работ', slug: '/work' },
      { name: 'Пример работы' },
    ],
  },
})

const route = useRoute()
const caseSlug = computed<string>(() => String(route.params.id ?? '').trim())

const { data: caseData } = await useCaseBySlug(caseSlug)

usePageEntityBreadcrumbs({
  title: computed(() => caseData.value?.name ?? ''),
  baseItems: [
    { name: 'Главная', slug: '/' },
    { name: 'Примеры работ', slug: '/work' },
  ],
})
</script>

<template>
  <CaseItem v-if="caseData" :caseItem="caseData" />
</template>
