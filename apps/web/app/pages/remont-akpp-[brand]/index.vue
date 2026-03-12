<script setup lang="ts">
import type { ModelItem } from '#shared/types/model'
import type { RouteLandingItem } from '#shared/types/route-landing'

import { computed } from 'vue'

import { useResolvedRouteLanding, useRouteLandings } from '~/composables/useRepoApi'
import { useRouteLandingPagePresentation } from '~/composables/useRouteLandingPagePresentation'

const route = useRoute()
const activeCity = useActiveCity()
const brandSlug = computed<string>(() => String(route.params.brand ?? '').trim())

const { data: landingData, error: landingError } = await useResolvedRouteLanding('brand', () => ({
  brand_slug: brandSlug.value,
  city_id: activeCity.value?.id,
}))

if (landingError.value) {
  throw landingError.value
}

if (!landingData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Brand landing not found',
  })
}

const { data: brandModelLandingsData } = await useRouteLandings(() => ({
  page_type: 'brand_model',
  brand_slug: brandSlug.value,
}))

const modelSliderItems = computed<ModelItem[]>(() => {
  const items = brandModelLandingsData.value ?? []

  return items
    .filter((landing: RouteLandingItem) => landing.model !== null)
    .map((landing: RouteLandingItem) => ({
      id: landing.model?.id ?? '',
      name: landing.model?.name ?? '',
      slug: landing.path,
      image_source: landing.model?.image_source ?? '',
      brand_id: landing.brand?.id ?? '',
      ...(landing.model?.image_alt ? { image_alt: landing.model.image_alt } : {}),
    }))
})

const { pageContent } = useRouteLandingPagePresentation({
  landing: landingData,
  baseItems: computed(() => [{ name: 'Главная', slug: '/' }, { name: 'Ремонт АКПП' }]),
})
</script>

<template>
  <Why
    :image_source="landingData?.brand?.image_source ?? ''"
    :image_alt="landingData?.brand?.image_alt ?? landingData?.brand?.name ?? ''" />
  <ModelSlider :items="modelSliderItems" />
  <RepairQuizBlock />
  <ServiceAndCaseSection />
  <Article>
    {{ pageContent }}
  </Article>
  <FaqAndReviews :route-landing-id="landingData?.id" />
</template>
