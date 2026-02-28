<script setup lang="ts">
import { BreadcrumbItem } from '#shared/types/layout/breadcrumb'

definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    title: 'Бренд',
    backgroundSrc: '/images/breadcrumbs.jpg',
    items: [
      new BreadcrumbItem({ label: 'Главная', to: '/' }),
      new BreadcrumbItem({ label: 'Бренды', to: '/brands' }),
      new BreadcrumbItem({ label: 'Бренд', to: '/brands/id' }),
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
