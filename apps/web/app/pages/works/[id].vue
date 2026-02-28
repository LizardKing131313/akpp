<script setup lang="ts">
import { BreadcrumbItem } from '#shared/types/layout/breadcrumb'

definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    title: 'Пример работы',
    backgroundSrc: '/images/breadcrumbs.jpg',
    items: [
      new BreadcrumbItem({ label: 'Главная', to: '/' }),
      new BreadcrumbItem({ label: 'Примеры работ', to: '/works' }),
      new BreadcrumbItem({ label: 'Пример работы', to: '/works/id' }),
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
