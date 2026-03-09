<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const routePageSettings = useRoutePageSettingsUi()
const caseSlug = computed<string>(() => String(route.params.id ?? '').trim())

const { data: caseData } = await useCaseBySlug(caseSlug)

usePageEntityBreadcrumbs({
  title: computed(() => caseData.value?.name ?? routePageSettings.value.breadcrumb_case_label),
  baseItems: computed(() => [
    { name: routePageSettings.value.breadcrumb_home_label, slug: '/' },
    { name: routePageSettings.value.breadcrumb_work_label, slug: '/work' },
  ]),
})
</script>

<template>
  <CaseItem v-if="caseData" :caseItem="caseData" />
</template>
