<script setup lang="ts">
import { BreadcrumbItem } from '#shared/types/layout/breadcrumb'

definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    title: 'АКПП',
    backgroundSrc: '/images/breadcrumbs.jpg',
    items: [
      new BreadcrumbItem({ label: 'Главная', to: '/' }),
      new BreadcrumbItem({ label: 'Определить АКПП', to: '/find_transmission' }),
      new BreadcrumbItem({ label: 'АКПП', to: '/find_transmission/id' }),
    ],
  },
})
</script>

<template>АКПП</template>
