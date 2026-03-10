<script setup lang="ts">
import { computed } from 'vue'

const { data: articlesData } = await useArticles()

const pageTitle = computed<string>(() => 'Статьи')

usePageEntityBreadcrumbs({
  title: pageTitle,
  baseItems: computed(() => [{ name: 'Главная', slug: '/' }]),
})
</script>

<template>
  <ImageCardGrid :items="articlesData ?? []" baseHref="/articles" />
</template>
