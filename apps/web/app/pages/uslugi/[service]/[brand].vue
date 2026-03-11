<script setup lang="ts">
import { computed } from 'vue'

import { useResolvedRouteLanding } from '~/composables/useRepoApi'
import { useRouteLandingPagePresentation } from '~/composables/useRouteLandingPagePresentation'

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
    const items = [
      { name: 'Главная', slug: '/' },
      { name: 'Услуги', slug: '/uslugi' },
    ]
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
</script>

<template>
  <Why
    :image_source="landingData?.brand?.image_source ?? ''"
    :image_alt="landingData?.brand?.image_alt ?? landingData?.brand?.name ?? ''" />
  <LazyRepairQuizBlock hydrate-on-visible />
  <ServiceAndCaseSection />
  <Article>
    {{ pageContent }}
  </Article>
  <LazyFaqAndReviews hydrate-on-visible />
</template>
