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

const caseImages = [
  {
    source: '/images/transmission.png',
    alt: 'Ford Focus вид сзади',
  },
  {
    source: '/images/transmission.png',
    alt: 'Процесс ремонта',
  },
  {
    source: '/images/transmission.png',
    alt: 'АКПП на стенде',
  },
]

const caseDetails = {
  transmission: 'DST250 сухой PowerShift',
  year: 2012,
  engineVolume: 2.0,
  mileage: '103 000 км',
  reason: 'Плановая замена масла',
}

const caseWorks = [
  'Была проведена частичная замена масла',
  'Проведена диагностика состояния АКПП',
  'Сброшены адаптации',
]

const caseCosts = {
  partsRub: 0,
  laborRub: 710,
}
</script>

<template>
  <WorkItem :images="caseImages" :details="caseDetails" :works="caseWorks" :costs="caseCosts" />
</template>
