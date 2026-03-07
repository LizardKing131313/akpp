<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const articleSlug = computed<string>(() => String(route.params.id ?? '').trim())

const { data: articleData } = await useArticleBySlug(articleSlug)

const articleContent = computed<string>(() => {
  return articleData.value?.content ?? ''
})
</script>

<template>
  <Article>
    <div v-html="articleContent" />
  </Article>
</template>
