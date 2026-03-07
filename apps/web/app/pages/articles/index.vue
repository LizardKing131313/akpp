<script setup lang="ts">
const { data: articlesData } = await useArticles()
</script>

<template>
  <ImageCardGrid :items="articlesData ?? []" />
</template>
