<script setup lang="ts">
import { PAGE_LABELS } from '#shared/constants/page-labels'
import { computed } from 'vue'

import { useSimplePagePresentation } from '~/composables/useSimplePagePresentation'

const { data: policyData } = await usePolicySettings()

const policyTitle = computed<string>(() => {
  return policyData.value?.title ?? PAGE_LABELS.policy
})

const policyArticle = computed<string>(() => {
  return policyData.value?.article ?? ''
})

useSimplePagePresentation({
  title: policyTitle,
  description: computed(
    () => 'Политика конфиденциальности и правила обработки персональных данных АКПП Центр.'
  ),
  baseItems: computed(() => [{ name: 'Главная', slug: '/' }]),
})
</script>

<template>
  <SimpleContentPage :title="policyTitle" :content="policyArticle" />
</template>
