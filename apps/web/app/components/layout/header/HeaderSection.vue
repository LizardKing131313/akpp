<script setup lang="ts">
import type { BreadcrumbItem } from '#shared/types/layout/breadcrumb'
import type { PageHeaderMeta } from '#shared/types/layout/header'
import type { HeroSlide } from '#shared/types/layout/hero'

import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageHeaderMeta = computed<PageHeaderMeta>(() => {
  const candidate = route.meta.pageHeader
  if (candidate === undefined) return { kind: 'none' }
  return candidate as PageHeaderMeta
})

const isHeroMeta = (meta: PageHeaderMeta): meta is Extract<PageHeaderMeta, { kind: 'hero' }> =>
  meta.kind === 'hero'

const isBreadcrumbsMeta = (
  meta: PageHeaderMeta
): meta is Extract<PageHeaderMeta, { kind: 'breadcrumbs' }> => meta.kind === 'breadcrumbs'

const heroSlides = computed<HeroSlide[]>(() => {
  const meta = pageHeaderMeta.value
  return isHeroMeta(meta) ? meta.slides : []
})

const breadcrumbsTitle = computed<string>(() => {
  const meta = pageHeaderMeta.value
  return isBreadcrumbsMeta(meta) ? meta.title : ''
})

const breadcrumbsBackgroundSrc = computed<string>(() => {
  const meta = pageHeaderMeta.value
  return isBreadcrumbsMeta(meta) ? meta.backgroundSrc : ''
})

const breadcrumbsItems = computed<BreadcrumbItem[]>(() => {
  const meta = pageHeaderMeta.value
  return isBreadcrumbsMeta(meta) ? meta.items : []
})

const isHero = computed<boolean>(() => isHeroMeta(pageHeaderMeta.value))
const isBreadcrumbs = computed<boolean>(() => isBreadcrumbsMeta(pageHeaderMeta.value))
</script>

<template>
  <header class="w-full">
    <TopBar
      iconSource="/images/icons/location.svg"
      iconAlt="location"
      city="Москва"
      searchIconSource="/images/icons/search.svg"
      searchPlaceholder="Поиск" />

    <div class="bg-brand-soft">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:py-6">
        <Logo />

        <div class="flex items-center gap-0">
          <ContactCard
            iconSource="/images/icons/time.svg"
            iconAlt="time"
            title="Пн - Вс 9:00 - 21:00"
            subtitle="Без выходных"
            class="hidden lg:flex" />

          <ContactCard
            iconSource="/images/icons/phone.svg"
            iconAlt="phone"
            title="+7 499 999 99 99"
            subtitle="Бесплатная консультация"
            linkType="tel"
            href="+74999999999"
            class="gap-1! px-0! lg:gap-3! lg:px-6!"
            titleClass="lg:text-lg! text-sm!"
            subtitleClass="hidden lg:block" />
        </div>
      </div>
    </div>

    <Menu />
  </header>

  <Hero v-if="isHero" :slides="heroSlides" />

  <Breadcrumbs
    v-else-if="isBreadcrumbs"
    :title="breadcrumbsTitle"
    :background-src="breadcrumbsBackgroundSrc"
    :items="breadcrumbsItems" />
</template>
