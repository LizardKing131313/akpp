<script setup lang="ts">
import type { BreadcrumbItem } from '#shared/types/breadcrumb'
import type { CityItem } from '#shared/types/city'
import type { HeaderSettings } from '#shared/types/header'
import type { HeroItem } from '#shared/types/hero'
import type { MenuItem } from '#shared/types/menu'

import { computed } from 'vue'

type HeaderSectionMode = 'none' | 'hero' | 'breadcrumbs'

type HeaderSectionProps = {
  readonly city?: CityItem | undefined

  readonly mode?: HeaderSectionMode | undefined

  readonly heroSlides?: HeroItem[] | undefined
  readonly menuItems?: MenuItem[] | undefined

  readonly breadcrumbsTitle?: string | undefined
  readonly breadcrumbsItems?: BreadcrumbItem[] | undefined

  readonly settings?: HeaderSettings | undefined
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
  menuItems: () => [],
  breadcrumbsTitle: '',
  breadcrumbsItems: () => [],
  settings: () => ({
    logo_source: '/images/logo/logo.svg',
    logo_source_mobile: '/images/logo/logo_mobile.svg',
    logo_alt: 'АКППЦЕНТР+',
    logo_href: '/',
    location_icon_source: '/images/icons/location.svg',
    location_icon_alt: 'location',
    location_button_aria_label: 'Выбрать город',
    search_icon_source: '/images/icons/search.svg',
    search_icon_alt: 'search',
    search_placeholder: 'Поиск',
    search_input_aria_label: 'Поиск по сайту',
    time_icon_source: '/images/icons/time.svg',
    time_icon_alt: 'time',
    phone_icon_source: '/images/icons/phone.svg',
    phone_icon_alt: 'phone',
    hero_button_label: 'Записаться',
    hero_button_aria_label: 'Записаться',
    hero_prev_slide_aria_label: 'Previous slide',
    hero_next_slide_aria_label: 'Next slide',
    breadcrumbs_background_source: '/images/breadcrumbs.jpg',
    breadcrumbs_background_alt: 'breadcrumbs background',
    menu_open_aria_label: 'Открыть меню',
    mobile_menu_aria_label: 'Меню',
    mobile_menu_back_aria_label: 'Назад',
    mobile_menu_open_section_aria_prefix: 'Открыть раздел',
    mobile_menu_select_item_aria_prefix: 'Выбрать пункт',
    menu_mobile_logo_source: '/images/logo/logo_menu.svg',
    menu_mobile_logo_alt: 'menu logo',
  }),
})

const cityName = computed<string>(() => props.city.name ?? '')
const workHoursTitle = computed<string>(() => props.city.work_hours_text)
const workHoursSubtitle = computed<string>(() => props.city.work_hours_subtext)
const phoneTitle = computed<string>(() => props.city.phone_number)
const phoneSubtitle = computed<string>(() => props.city.phone_text)
const phoneHref = computed<string>(() => props.city.phone_number)

const isHero = computed<boolean>(() => props.mode === 'hero')
</script>

<template>
  <header class="w-full">
    <TopBar
      :iconSource="settings.location_icon_source"
      :iconAlt="settings.location_icon_alt"
      :city="cityName"
      :cityButtonAriaLabel="settings.location_button_aria_label"
      :searchIconSource="settings.search_icon_source"
      :searchIconAlt="settings.search_icon_alt"
      :searchPlaceholder="settings.search_placeholder"
      :searchInputAriaLabel="settings.search_input_aria_label" />

    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:py-6">
      <Logo
        :iconSource="settings.logo_source"
        :iconSourceMobile="settings.logo_source_mobile"
        :iconAlt="settings.logo_alt"
        :href="settings.logo_href" />

      <div class="flex items-center gap-0">
        <ContactCard
          :iconSource="settings.time_icon_source"
          :iconAlt="settings.time_icon_alt"
          :title="workHoursTitle"
          :subtitle="workHoursSubtitle"
          class="hidden lg:flex" />

        <ContactCard
          :iconSource="settings.phone_icon_source"
          :iconAlt="settings.phone_icon_alt"
          :title="phoneTitle"
          :subtitle="phoneSubtitle"
          linkType="tel"
          :href="phoneHref"
          class="gap-1! px-0! lg:gap-3! lg:px-6!"
          titleClass="lg:text-lg! text-sm!"
          subtitleClass="hidden lg:block" />
      </div>
    </div>

    <Menu
      :menuItems="menuItems"
      :menuOpenAriaLabel="settings.menu_open_aria_label"
      :mobileMenuAriaLabel="settings.mobile_menu_aria_label"
      :mobileMenuBackAriaLabel="settings.mobile_menu_back_aria_label"
      :mobileMenuOpenSectionAriaPrefix="settings.mobile_menu_open_section_aria_prefix"
      :mobileMenuSelectItemAriaPrefix="settings.mobile_menu_select_item_aria_prefix"
      :menuMobileLogoSource="settings.menu_mobile_logo_source"
      :menuMobileLogoAlt="settings.menu_mobile_logo_alt" />
  </header>

  <Hero
    v-if="isHero"
    :slides="heroSlides"
    :buttonLabel="settings.hero_button_label"
    :buttonAriaLabel="settings.hero_button_aria_label"
    :prevSlideAriaLabel="settings.hero_prev_slide_aria_label"
    :nextSlideAriaLabel="settings.hero_next_slide_aria_label" />

  <Breadcrumbs
    v-else-if="!isHero"
    :title="breadcrumbsTitle"
    :items="breadcrumbsItems"
    :image_source="settings.breadcrumbs_background_source"
    :image_alt="settings.breadcrumbs_background_alt" />
</template>
