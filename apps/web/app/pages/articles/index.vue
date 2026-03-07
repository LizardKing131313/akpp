<script setup lang="ts">
definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    breadcrumb: 'Статьи',
    breadcrumbs: [
      { name: 'Главная', slug: '/' },
      { name: 'Статьи', slug: '/articles' },
    ],
  },
})

const { data: articlesData } = await useArticles()
</script>

<template>
  <ImageCardGrid :items="articlesData ?? []" />
</template>
