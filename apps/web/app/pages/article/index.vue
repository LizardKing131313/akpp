<script setup lang="ts">
import { BreadcrumbItem } from '#shared/types/layout/breadcrumb'

import ImageCardGrid from '~/components/shared/ImageCardGrid.vue'

definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    title: 'Полезные статьи',
    backgroundSrc: '/images/breadcrumbs.jpg',
    items: [
      new BreadcrumbItem({ label: 'Главная', to: '/' }),
      new BreadcrumbItem({ label: 'Полезные статьи', to: '/articles' }),
    ],
  },
})

const items = [
  {
    id: '1',
    title: 'Ремонт гидроблока',
    date: '12.02.2026',
    href: '/articles/1',
    imageSrc: '/images/transmission.png',
    imageAlt: 'Гидроблок',
  },
  {
    id: '2',
    title: 'Ремонт гидроблока',
    date: '12.02.2026',
    href: '/articles/1',
    imageSrc: '/images/transmission.png',
    imageAlt: 'Гидроблок',
  },
  {
    id: '3',
    title: 'Ремонт гидроблока',
    date: '12.02.2026',
    href: '/articles/1',
    imageSrc: '/images/transmission.png',
    imageAlt: 'Гидроблок',
  },
  {
    id: '4',
    title: 'Ремонт гидроблока',
    date: '12.02.2026',
    href: '/articles/1',
    imageSrc: '/images/transmission.png',
    imageAlt: 'Гидроблок',
  },
  {
    id: '5',
    title: 'Ремонт гидроблока',
    date: '12.02.2026',
    href: '/articles/1',
    imageSrc: '/images/transmission.png',
    imageAlt: 'Гидроблок',
  },
  {
    id: '6',
    title: 'Ремонт гидроблока',
    date: '12.02.2026',
    href: '/articles/1',
    imageSrc: '/images/transmission.png',
    imageAlt: 'Гидроблок',
  },
  {
    id: '7',
    title: 'Ремонт гидроблока',
    date: '12.02.2026',
    href: '/articles/1',
    imageSrc: '/images/transmission.png',
    imageAlt: 'Гидроблок',
  },
]
</script>

<template>
  <ImageCardGrid :items />
</template>
