<script setup lang="ts">
definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    breadcrumb: 'Трансмиссии',
    breadcrumbs: [
      { name: 'Главная', slug: '/' },
      { name: 'Трансмиссии', slug: '/transmission' },
    ],
  },
})
</script>

<template>
  <BrandsGrid />
</template>
