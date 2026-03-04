<script setup lang="ts">
import { BreadcrumbItem } from '#shared/types/layout/breadcrumb'

const route = useRoute()

watchEffect(() => {
  route.meta.pageHeader = {
    kind: 'breadcrumbs',
    title: 'Коробки передач',
    backgroundSrc: '/images/breadcrumbs.jpg',
    items: [
      new BreadcrumbItem({ label: 'Главная', to: '/' }),
      new BreadcrumbItem({ label: 'Коробки передач', to: '/transmission' }),
    ],
  }
})
</script>

<template>
  <BrandsGrid />
</template>
