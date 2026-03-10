<script setup lang="ts">
import { PAGE_LABELS } from '#shared/constants/page-labels'
import { computed } from 'vue'

import { useSimplePagePresentation } from '~/composables/useSimplePagePresentation'

const { data: articlesData } = await useArticles()

const pageTitle = computed<string>(() => PAGE_LABELS.articles)

useSimplePagePresentation({
  title: pageTitle,
  description: pageTitle,
  baseItems: computed(() => [{ name: 'Главная', slug: '/' }]),
})
</script>

<template>
  <ImageCardGrid :items="articlesData ?? []" baseHref="/articles" />
</template>
