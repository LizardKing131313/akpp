<script setup lang="ts">
import { computed } from 'vue'

const { data: policyData } = await usePolicySettings()

const defaultTitle = 'Политика конфиденциальности'

const policyTitle = computed<string>(() => {
  return policyData.value?.title ?? defaultTitle
})

definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    breadcrumb: defaultTitle,
    breadcrumbs: [
      { name: 'Главная', slug: '/' },
      { name: defaultTitle, slug: '/policy' },
    ],
  },
})

const policyArticle = computed<string>(() => {
  return policyData.value?.article ?? ''
})

usePageEntityBreadcrumbs({
  title: policyTitle,
  baseItems: [{ name: 'Главная', slug: '/' }],
})
</script>

<template>
  <div class="space-y-6">
    <CenteredTitle>{{ policyTitle }}</CenteredTitle>

    <div class="text-brand-grey prose prose-sm max-w-none" v-html="policyArticle" />
  </div>
</template>
