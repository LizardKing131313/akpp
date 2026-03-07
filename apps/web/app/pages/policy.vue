<script setup lang="ts">
import { computed } from 'vue'

definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    title: 'Политика конфиденциальности',
    backgroundSrc: '/images/breadcrumbs.jpg',
  },
})

const { data: policyData } = await usePolicySettings()

const policyTitle = computed<string>(() => {
  return policyData.value?.title ?? 'Политика конфиденциальности'
})

const policyArticle = computed<string>(() => {
  return policyData.value?.article ?? ''
})
</script>

<template>
  <div class="space-y-6">
    <CenteredTitle>{{ policyTitle }}</CenteredTitle>

    <div class="text-brand-grey prose prose-sm max-w-none" v-html="policyArticle" />
  </div>
</template>
