<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { BrandItem } from '#shared/types/components/brand'
import { ItemImage } from '#shared/types/components/image'
import { WorkExample } from '#shared/types/components/work_example'

import GoToLink from '~/components/shared/GoToLink.vue'

const works = [
  new WorkExample({
    id: 'repair_skoda',
    brand: new BrandItem({
      id: 'skoda',
      title: 'Skoda',
      href: '/brands/skoda',
      logo: new ItemImage({ source: '/images/brands/skoda.png', alt: 'Skoda logo' }),
    }),
    title: 'Ремонт АКПП Шкода Октавия III',
    date: '27.02.2024',
    href: '/works/repair_skoda',
    image: new ItemImage({ source: '/images/work/repair_skoda.png', alt: 'repair_skoda' }),
  }),
  new WorkExample({
    id: 'repair_bmw',
    brand: new BrandItem({
      id: 'bmw',
      title: 'BMW',
      href: '/brands/bmw',
      logo: new ItemImage({ source: '/images/brands/bmw.png', alt: 'BMW logo' }),
    }),
    title: 'Ремонт АКПП BMW X6',
    date: '27.02.2024',
    href: '/works/repair-bmw',
    image: new ItemImage({ source: '/images/work/repair_bmw.png', alt: 'repair_bmw' }),
  }),
  new WorkExample({
    id: 'repair_ford',
    brand: new BrandItem({
      id: 'ford',
      title: 'Ford',
      href: '/brands/ford',
      logo: new ItemImage({ source: '/images/brands/ford.png', alt: 'Ford logo' }),
    }),
    title: 'Замена масла Ford Focus',
    date: '05.02.2024',
    href: '/works/repair_ford',
    image: new ItemImage({ source: '/images/work/repair_ford.png', alt: 'repair_ford' }),
  }),
]
</script>

<template>
  <div class="space-y-8 lg:max-h-105.75 lg:space-y-12">
    <CenteredTitle class="text-left">Выполненные работы</CenteredTitle>

    <div class="grid grid-cols-2 gap-4 lg:hidden">
      <WorkExampleCard
        v-for="(work, index) in works.slice(0, 3)"
        :key="work.id"
        :work
        variant="tile"
        :class="index === 2 ? 'col-span-2' : ''" />
    </div>

    <div class="hidden space-y-8 lg:block">
      <WorkExampleCard v-for="work in works.slice(0, 3)" :key="work.id" :work variant="list" />
    </div>

    <div>
      <NuxtLink to="works" class="group w-full transition-colors lg:hidden">
        <div
          :class="
            cn(`
              bg-brand-red hover:bg-brand-red/90 text-brand-soft mx-auto
              flex w-fit items-center justify-center rounded-full
              px-12 py-4 font-bold transition-colors
            `)
          ">
          Показать ещё
        </div>
      </NuxtLink>

      <GoToLink href="/apps/web/app/pages/work" class="hover:text-brand-dark! hidden lg:block">
        Показать все работы
      </GoToLink>
    </div>
  </div>
</template>
