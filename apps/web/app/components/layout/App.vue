<script setup lang="ts">
import type { BreadcrumbItem } from '#shared/types/breadcrumb'
import type { CityItem } from '#shared/types/city'
import type { HeroItem } from '#shared/types/hero'

import { computed } from 'vue'

type PageHeaderMetaValue = {
  readonly kind?: 'hero' | 'breadcrumbs' | 'none'
  readonly slides?: HeroItem[]
  readonly title?: string
  readonly items?: BreadcrumbItem[]
  readonly backgroundSrc?: string
}

const route = useRoute()

const [
  { data: headerSettingsData },
  { data: footerSettingsData },
  { data: citiesData },
  { data: heroesData },
  { data: menusData },
  { data: articlesData },
] = await Promise.all([
  useHeaderSettings(),
  useFooterSettings(),
  useCities(),
  useHeroes(),
  useMenus(),
  useArticles(),
])

const activeCity = computed<CityItem | undefined>(() => {
  const cities = citiesData.value ?? []
  const defaultCity = cities.find((cityItem) => cityItem.is_default)
  return defaultCity ?? cities[0]
})

const { data: locationsData } = await useLocations(computed(() => activeCity.value?.id))

const pageHeaderMeta = computed<PageHeaderMetaValue>(() => {
  const routeMeta = route.meta as { pageHeader?: PageHeaderMetaValue }
  return routeMeta.pageHeader ?? {}
})

const headerMode = computed<'hero' | 'breadcrumbs' | 'none'>(() => {
  const mode = pageHeaderMeta.value.kind
  if (mode === 'hero' || mode === 'breadcrumbs') {
    return mode
  }

  return 'none'
})

const heroSlides = computed<HeroItem[]>(() => {
  const metaSlides = pageHeaderMeta.value.slides
  if (Array.isArray(metaSlides) && metaSlides.length > 0) {
    return metaSlides
  }

  return heroesData.value ?? []
})

const breadcrumbsTitle = computed<string>(() => pageHeaderMeta.value.title ?? '')
const breadcrumbsItems = computed<BreadcrumbItem[]>(() => pageHeaderMeta.value.items ?? [])
const breadcrumbsImageSource = computed<string>(() => {
  const imageSource = pageHeaderMeta.value.backgroundSrc?.trim() ?? ''
  return imageSource.length > 0 ? imageSource : '/images/breadcrumbs.jpg'
})

const menuItems = computed(() => menusData.value ?? [])
const footerSettings = computed(() => footerSettingsData.value)
const footerLocations = computed(() => locationsData.value ?? [])

const footerArticles = computed(() => {
  const articles = articlesData.value ?? []
  return articles.slice(0, 3)
})

const searchPlaceholder = computed<string>(() => {
  return headerSettingsData.value?.search ?? 'Поиск'
})
</script>

<template>
  <div class="bg-brand-white text-brand-dark flex min-h-dvh flex-col overflow-x-hidden text-xl">
    <HeaderSection
      :city="activeCity"
      :mode="headerMode"
      :heroSlides="heroSlides"
      :breadcrumbsTitle="breadcrumbsTitle"
      :breadcrumbsItems="breadcrumbsItems"
      :breadcrumbsImageSource="breadcrumbsImageSource"
      :menuItems="menuItems"
      :searchPlaceholder="searchPlaceholder" />

    <Section>
      <slot />
    </Section>

    <FooterSection
      class="mt-auto"
      :settings="footerSettings"
      :city="activeCity"
      :locations="footerLocations"
      :articles="footerArticles" />
  </div>

  <ModalHost />
</template>
