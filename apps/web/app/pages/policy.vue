<script setup lang="ts">
import { PAGE_LABELS } from '#shared/constants/page-labels'
import { computed } from 'vue'

const { data: policyData } = await usePolicySettings()

const policyTitle = computed<string>(() => {
  return policyData.value?.title ?? PAGE_LABELS.policy
})

const policyArticle = computed<string>(() => {
  return policyData.value?.article ?? ''
})
</script>

<template>
  <SimpleContentPage :title="policyTitle" :content="policyArticle" />
</template>
