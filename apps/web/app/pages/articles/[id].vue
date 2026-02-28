<script setup lang="ts">
import { BreadcrumbItem } from '#shared/types/layout/breadcrumb'

definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    title: 'Статья',
    backgroundSrc: '/images/breadcrumbs.jpg',
    items: [
      new BreadcrumbItem({ label: 'Главная', to: '/' }),
      new BreadcrumbItem({ label: 'Полезные статьи', to: '/articles' }),
      new BreadcrumbItem({ label: 'Статья', to: '/articles/id' }),
    ],
  },
})
</script>

<template>
  <BrandsGrid />
  <ServicesSection />
  <RepairQuizBlock />
  <ServiceAndWorksSection />
  <PerksSection />
  <FaqAndReviews />
</template>
