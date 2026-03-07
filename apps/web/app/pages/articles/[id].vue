<script setup lang="ts">
import { computed } from 'vue'

definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    breadcrumb: 'Статья',
    breadcrumbs: [
      { name: 'Главная', slug: '/' },
      { name: 'Статьи', slug: '/articles' },
      { name: 'Статья' },
    ],
  },
})

const route = useRoute()
const articleSlug = computed<string>(() => String(route.params.id ?? '').trim())

const { data: articleData } = await useArticleBySlug(articleSlug)

const articleContent = computed<string>(() => {
  return articleData.value?.content ?? ''
})

useDynamicBreadcrumbs({
  title: computed(() => articleData.value?.name ?? ''),
  baseItems: [
    { name: 'Главная', slug: '/' },
    { name: 'Статьи', slug: '/articles' },
  ],
})
</script>

<template>
  <Article>
    <div v-html="articleContent" />
  </Article>
</template>
