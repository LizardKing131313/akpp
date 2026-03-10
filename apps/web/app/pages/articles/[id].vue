<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const articleSlug = computed<string>(() => String(route.params.id ?? '').trim())

const { data: articleData } = await useArticleBySlug(articleSlug)
const pageTitle = computed<string>(() => articleData.value?.name ?? 'Статья')

const articleContent = computed<string>(() => {
  return articleData.value?.content ?? ''
})

usePageEntityBreadcrumbs({
  title: pageTitle,
  baseItems: computed(() => [
    { name: 'Главная', slug: '/' },
    { name: 'Статьи', slug: '/articles' },
  ]),
})
</script>

<template>
  <Article>
    <div v-html="articleContent" />
  </Article>
</template>
