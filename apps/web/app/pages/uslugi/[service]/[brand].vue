<script setup lang="ts">
import { computed } from 'vue'

import { useResolvedRouteLanding } from '~/composables/useRepoApi'
import { useRouteLandingPagePresentation } from '~/composables/useRouteLandingPagePresentation'

definePageMeta({
  key: (route) => route.fullPath,
})

const route = useRoute()
const activeCity = useActiveCity()

const serviceSlug = computed<string>(() => String(route.params.service ?? '').trim())
const brandSlug = computed<string>(() => String(route.params.brand ?? '').trim())

const { data: landingData, error: landingError } = await useResolvedRouteLanding(
  'service_brand',
  () => ({
    service_slug: serviceSlug.value,
    brand_slug: brandSlug.value,
    city_id: activeCity.value?.id,
  })
)

if (landingError.value) {
  throw landingError.value
}

if (!landingData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

const { pageContent } = useRouteLandingPagePresentation({
  landing: landingData,
  baseItems: computed(() => {
    const items = [{ name: 'Главная', slug: '/' }, { name: 'Услуги' }]
    const serviceName = landingData.value?.service?.name ?? ''
    const serviceSlugValue = landingData.value?.service?.slug ?? ''

    if (serviceName.length > 0 && serviceSlugValue.length > 0) {
      items.push({
        name: serviceName,
        slug: `/uslugi/${serviceSlugValue}`,
      })
    }

    return items
  }),
})

const requestUrl = useRequestURL()
const serviceJsonLd = computed<Record<string, unknown> | null>(() => {
  if (!landingData.value?.service || !landingData.value?.brand) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': new URL(landingData.value.path, requestUrl.origin).toString(),
    name:
      landingData.value.resolved_h1 ||
      `${landingData.value.service.name} ${landingData.value.brand.name}`,
    description: landingData.value.resolved_seo_description || pageContent.value,
    serviceType: landingData.value.service.name,
    image: landingData.value.brand.image_source
      ? [new URL(landingData.value.brand.image_source, requestUrl.origin).toString()]
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
    audience: {
      '@type': 'Audience',
      audienceType: `Владельцы ${landingData.value.brand.name}`,
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
  <Why
    :image_source="landingData?.brand?.image_source ?? ''"
    :image_alt="landingData?.brand?.image_alt ?? landingData?.brand?.name ?? ''" />
  <RepairQuizBlock />
  <ServiceAndCaseSection />
  <Article>
    {{ pageContent }}
  </Article>
  <FaqAndReviews :route-landing-id="landingData?.id" />
</template>
