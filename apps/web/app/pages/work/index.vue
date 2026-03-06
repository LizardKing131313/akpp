<script setup lang="ts">
definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    title: 'Примеры работ',
    backgroundSrc: '/images/breadcrumbs.jpg',
    items: [
      { label: 'Главная', to: '/' },
      { label: 'Примеры работ', to: '/work' },
    ],
  },
})
</script>

<template>
  <ImageCardGrid />
</template>
