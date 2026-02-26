<script setup lang="ts">
import { BreadcrumbItem } from '#shared/types/layout/breadcrumb'

const route = useRoute()

watchEffect(() => {
  route.meta.pageHeader = {
    kind: 'breadcrumbs',
    title: 'Услуга',
    backgroundSrc: '/images/breadcrumbs.jpg',
    items: [
      new BreadcrumbItem({ label: 'Главная', to: '/' }),
      new BreadcrumbItem({ label: 'Услуги', to: '/services' }),
      new BreadcrumbItem({ label: 'Услуга', to: '/services/1' }),
    ],
  }
})
</script>

<template>
  <BrandsGrid />
  <ServicesSection />
  <ServiceAndWorksSection />
  <PerksSection />
  <FaqAndReviews />
</template>
