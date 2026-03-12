<script setup lang="ts">
import { PAGE_LABELS } from '#shared/constants/page-labels'
import { computed } from 'vue'

import { useSimplePagePresentation } from '~/composables/useSimplePagePresentation'

const { data: articlesData } = await useArticles()

const pageTitle = computed<string>(() => PAGE_LABELS.articles)
const pageDescription = computed<string>(
  () =>
    'Полезные статьи по ремонту АКПП, вариаторов и DSG: признаки неисправностей, диагностика, обслуживание и практические рекомендации.'
)

useSimplePagePresentation({
  title: pageTitle,
  description: pageDescription,
  baseItems: computed(() => [{ name: 'Главная', slug: '/' }]),
})
</script>

<template>
  <Breadcrumbs />
  <ImageCardGrid :items="articlesData ?? []" baseHref="/articles" />
</template>
