<script setup lang="ts">
const routePageSettings = useRoutePageSettingsUi()
const { data: articlesData } = await useArticles()

usePageEntityBreadcrumbs({
  title: () => routePageSettings.value.breadcrumb_articles_label,
  baseItems: () => [{ name: routePageSettings.value.breadcrumb_home_label, slug: '/' }],
})
</script>

<template>
  <ImageCardGrid :items="articlesData ?? []" baseHref="/articles" />
</template>
