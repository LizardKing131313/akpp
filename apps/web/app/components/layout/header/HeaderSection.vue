<script setup lang="ts">
import type { BreadcrumbItem } from '#shared/types/breadcrumb'
import type { CityItem } from '#shared/types/city'
import type { HeroItem } from '#shared/types/hero'

import { computed } from 'vue'

type HeaderSectionMode = 'none' | 'hero' | 'breadcrumbs'

type HeaderSectionProps = {
  readonly city?: CityItem

  readonly mode?: HeaderSectionMode

  readonly heroSlides?: HeroItem[]

  readonly breadcrumbsTitle?: string
  readonly breadcrumbsImageSource?: string
  readonly breadcrumbsItems?: BreadcrumbItem[]

  readonly locationIconSource?: string
  readonly locationIconAlt?: string

  readonly searchIconSource?: string
  readonly searchPlaceholder?: string

  readonly timeIconSource?: string
  readonly timeIconAlt?: string

  readonly phoneIconSource?: string
  readonly phoneIconAlt?: string
}

const props = withDefaults(defineProps<HeaderSectionProps>(), {
  city: () => ({
    id: 'msk',
    name: 'Москва',
    slug: 'msk',
    is_default: true,
    work_hours_text: 'Пн - Вс 9:00 - 21:00',
    work_hours_subtext: 'Без выходных',
    phone_number: '+74999999999',
    phone_text: 'Бесплатная консультация',
    email_value: '',
    email_text: '',
  }),
  mode: 'none',
  heroSlides: () => [],
  breadcrumbsTitle: '',
  breadcrumbsImageSource: '',
  breadcrumbsItems: () => [],
  locationIconSource: '/images/icons/location.svg',
  locationIconAlt: 'location',
  searchIconSource: '/images/icons/search.svg',
  searchPlaceholder: 'Поиск',
  timeIconSource: '/images/icons/time.svg',
  timeIconAlt: 'time',
  phoneIconSource: '/images/icons/phone.svg',
  phoneIconAlt: 'phone',
})

const cityName = computed<string>(() => props.city.name ?? '')
const workHoursTitle = computed<string>(() => props.city.work_hours_text)
const workHoursSubtitle = computed<string>(() => props.city.work_hours_subtext)
const phoneTitle = computed<string>(() => props.city.phone_number)
const phoneSubtitle = computed<string>(() => props.city.phone_text)
const phoneHref = computed<string>(() => props.city.phone_number)

const isHero = computed<boolean>(() => props.mode === 'hero')
const isBreadcrumbs = computed<boolean>(() => props.mode === 'breadcrumbs')
</script>

<template>
  <header class="w-full">
    <TopBar
      :iconSource="locationIconSource"
      :iconAlt="locationIconAlt"
      :city="cityName"
      :searchIconSource="searchIconSource"
      :searchPlaceholder="searchPlaceholder" />

    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:py-6">
      <Logo />

      <div class="flex items-center gap-0">
        <ContactCard
          :iconSource="timeIconSource"
          :iconAlt="timeIconAlt"
          :title="workHoursTitle"
          :subtitle="workHoursSubtitle"
          class="hidden lg:flex" />

        <ContactCard
          :iconSource="phoneIconSource"
          :iconAlt="phoneIconAlt"
          :title="phoneTitle"
          :subtitle="phoneSubtitle"
          linkType="tel"
          :href="phoneHref"
          class="gap-1! px-0! lg:gap-3! lg:px-6!"
          titleClass="lg:text-lg! text-sm!"
          subtitleClass="hidden lg:block" />
      </div>
    </div>

    <Menu />
  </header>

  <Hero v-if="isHero" :slides="heroSlides" />

  <Breadcrumbs
    v-else-if="isBreadcrumbs"
    :title="breadcrumbsTitle"
    :image_source="breadcrumbsImageSource"
    :items="breadcrumbsItems" />
</template>
