<script setup lang="ts">
import { computed } from 'vue'

const routePageSettings = useRoutePageSettingsUi()
const route = useRoute()
const articleSlug = computed<string>(() => String(route.params.id ?? '').trim())

const { data: articleData } = await useArticleBySlug(articleSlug)

const articleContent = computed<string>(() => {
  return articleData.value?.content ?? ''
})

usePageEntityBreadcrumbs({
  title: computed(
    () => articleData.value?.name ?? routePageSettings.value.breadcrumb_article_label
  ),
  baseItems: computed(() => [
    { name: routePageSettings.value.breadcrumb_home_label, slug: '/' },
    { name: routePageSettings.value.breadcrumb_articles_label, slug: '/articles' },
  ]),
})
</script>

<template>
  <Article>
    <div v-html="articleContent" />
  </Article>
</template>
