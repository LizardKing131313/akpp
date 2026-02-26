<script setup lang="ts">
import { BreadcrumbItem } from '#shared/types/layout/breadcrumb'

definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    title: 'Услуги',
    backgroundSrc: '/images/breadcrumbs.jpg',
    items: [
      new BreadcrumbItem({ label: 'Главная', to: '/' }),
      new BreadcrumbItem({ label: 'Услуги', to: '/services' }),
    ],
  },
})
</script>

<template>
  <BrandsGrid />
  <ServicesSection />
  <ServiceAndWorksSection />
  <PerksSection />
  <FaqAndReviews />
</template>
