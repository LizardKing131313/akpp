<script setup lang="ts">
import type { BrandItem } from '#shared/types/brand'
import type { RouteLandingItem } from '#shared/types/route-landing'

import { computed } from 'vue'

import { useResolvedRouteLanding, useRouteLandings } from '~/composables/useRepoApi'
import { useRouteLandingPagePresentation } from '~/composables/useRouteLandingPagePresentation'

const route = useRoute()
const activeCity = useActiveCity()
const serviceSlug = computed<string>(() => String(route.params.service ?? '').trim())

const { data: landingData, error: landingError } = await useResolvedRouteLanding('service', () => ({
  service_slug: serviceSlug.value,
  city_id: activeCity.value?.id,
}))

if (landingError.value) {
  throw landingError.value
}

if (!landingData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Service landing not found',
  })
}

const { data: serviceBrandLandingsData } = await useRouteLandings(() => ({
  page_type: 'service_brand',
  service_slug: serviceSlug.value,
}))

const brandsForService = computed<BrandItem[]>(() => {
  const items = serviceBrandLandingsData.value ?? []

  return items
    .filter((landing: RouteLandingItem) => landing.brand !== null)
    .map((landing: RouteLandingItem) => ({
      id: landing.brand?.id ?? '',
      name: landing.brand?.name ?? '',
      slug: landing.path,
      image_source: landing.brand?.image_source ?? '',
      ...(landing.brand?.image_alt ? { image_alt: landing.brand.image_alt } : {}),
    }))
})

const { pageContent } = useRouteLandingPagePresentation({
  landing: landingData,
  baseItems: computed(() => [
    { name: 'Главная', slug: '/' },
    { name: 'Услуги', slug: '/uslugi' },
  ]),
})
</script>

<template>
  <BrandsGrid :brands="brandsForService" :baseHref="`uslugi/${serviceSlug}/`" />
  <Why
    :image_source="landingData?.service?.image_source ?? ''"
    :image_alt="landingData?.service?.image_alt ?? landingData?.service?.name ?? ''" />
  <LazyRepairQuizBlock hydrate-on-visible />
  <ServiceAndCaseSection />
  <Article>
    {{ pageContent }}
  </Article>
  <LazyFaqAndReviews :route-landing-id="landingData?.id" hydrate-on-visible />
</template>
