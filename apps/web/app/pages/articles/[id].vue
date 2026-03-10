<script setup lang="ts">
import { PAGE_LABELS } from '#shared/constants/page-labels'
import { computed } from 'vue'

import { useSimplePagePresentation } from '~/composables/useSimplePagePresentation'

const route = useRoute()
const articleSlug = computed<string>(() => String(route.params.id ?? '').trim())

const { data: articleData } = await useArticleBySlug(articleSlug)
const pageTitle = computed<string>(() => articleData.value?.name ?? PAGE_LABELS.article)

const articleContent = computed<string>(() => {
  return articleData.value?.content ?? ''
})

useSimplePagePresentation({
  title: pageTitle,
  description: pageTitle,
  baseItems: computed(() => [
    { name: 'Главная', slug: '/' },
    { name: PAGE_LABELS.articles, slug: '/articles' },
  ]),
})
</script>

<template>
  <Article>
    <div v-html="articleContent" />
  </Article>
</template>
