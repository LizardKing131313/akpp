<script setup lang="ts">
import type { GearboxRow } from '~/components/transmission/TransmissionTable.vue'

import { BreadcrumbItem } from '#shared/types/layout/breadcrumb'

definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    title: 'Определить АКПП по марке',
    backgroundSrc: '/images/breadcrumbs.jpg',
    items: [
      new BreadcrumbItem({ label: 'Главная', to: '/' }),
      new BreadcrumbItem({ label: 'Определить АКПП', to: '/find_transmission' }),
    ],
  },
})

const rows: GearboxRow[] = Array.from({ length: 30 }).map((_, index) => {
  const yearStart = 1995 + (index % 20)
  const yearEnd = yearStart + 3

  return {
    brand: index % 2 === 0 ? 'Acura' : 'Alfa Romeo',
    model: `Model ${index + 1}`,
    years: `${yearStart} - ${yearEnd}`,
    engine: (2 + (index % 3) * 0.5).toFixed(1),
    drive: index % 3 === 0 ? 'передний' : index % 3 === 1 ? 'полный' : 'задний',
    akpp: index % 2 === 0 ? '5sp MCTA' : '4sp MPZA',
    href: '/find_transmission/id',
  }
})
</script>

<template>
  <TransmissionTable :rows />
</template>
