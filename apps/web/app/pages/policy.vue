<script setup lang="ts">
import { computed } from 'vue'

const { data: policyData } = await usePolicySettings()
const routePageSettings = useRoutePageSettingsUi()

const policyTitle = computed<string>(() => {
  return policyData.value?.title ?? routePageSettings.value.breadcrumb_policy_label
})

const policyArticle = computed<string>(() => {
  return policyData.value?.article ?? ''
})

usePageEntityBreadcrumbs({
  title: policyTitle,
  baseItems: computed(() => [{ name: routePageSettings.value.breadcrumb_home_label, slug: '/' }]),
})
</script>

<template>
  <div class="space-y-6">
    <CenteredTitle>{{ policyTitle }}</CenteredTitle>

    <div class="text-brand-grey prose prose-sm max-w-none" v-html="policyArticle" />
  </div>
</template>
