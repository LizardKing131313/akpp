<script setup lang="ts">
import type { BrandItem } from '#shared/types/brand'
import type { RouteLandingItem } from '#shared/types/route-landing'

import { computed } from 'vue'

import { useResolvedRouteLanding, useRouteLandings } from '~/composables/useRepoApi'
import { useRouteLandingPagePresentation } from '~/composables/useRouteLandingPagePresentation'

definePageMeta({
  key: (route) => route.fullPath,
})

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
  baseItems: computed(() => [{ name: 'Главная', slug: '/' }, { name: 'Услуги' }]),
})

const requestUrl = useRequestURL()
const serviceJsonLd = computed<Record<string, unknown> | null>(() => {
  if (!landingData.value?.service) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': new URL(landingData.value.path, requestUrl.origin).toString(),
    name: landingData.value.resolved_h1 || landingData.value.service.name,
    description: landingData.value.resolved_seo_description || pageContent.value,
    serviceType: landingData.value.service.name,
    image: landingData.value.service.image_source
      ? [new URL(landingData.value.service.image_source, requestUrl.origin).toString()]
      : undefined,
    provider: {
      '@type': 'Organization',
      name: 'АКПП Центр',
      url: requestUrl.origin,
    },
    areaServed: {
      '@type': 'City',
      name: activeCity.value?.name ?? 'Москва',
    },
  }
})

useHead(() => {
  if (serviceJsonLd.value === null) {
    return {}
  }

  return {
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(serviceJsonLd.value),
      },
    ],
  }
})
</script>

<template>
  <BrandsGrid :brands="brandsForService" />
  <Why
    :image_source="landingData?.service?.image_source ?? ''"
    :image_alt="landingData?.service?.image_alt ?? landingData?.service?.name ?? ''" />
  <RepairQuizBlock />
  <ServiceAndCaseSection />
  <Article>
    {{ pageContent }}
  </Article>
  <FaqAndReviews :route-landing-id="landingData?.id" />
</template>
