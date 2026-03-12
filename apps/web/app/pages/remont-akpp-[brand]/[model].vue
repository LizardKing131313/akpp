<script setup lang="ts">
import { computed } from 'vue'

import { useResolvedRouteLanding } from '~/composables/useRepoApi'
import { useRouteLandingPagePresentation } from '~/composables/useRouteLandingPagePresentation'

const route = useRoute()
const activeCity = useActiveCity()

const brandSlug = computed<string>(() => String(route.params.brand ?? '').trim())
const modelSlug = computed<string>(() => String(route.params.model ?? '').trim())

const { data: landingData, error: landingError } = await useResolvedRouteLanding(
  'brand_model',
  () => ({
    brand_slug: brandSlug.value,
    model_slug: modelSlug.value,
    city_id: activeCity.value?.id,
  })
)

if (landingError.value) {
  throw landingError.value
}

if (!landingData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Brand model landing not found',
  })
}

const { pageContent } = useRouteLandingPagePresentation({
  landing: landingData,
  baseItems: computed(() => {
    const items = [{ name: 'Главная', slug: '/' }, { name: 'Ремонт АКПП' }]
    const brandName = landingData.value?.brand?.name ?? ''
    const brandSlugValue = landingData.value?.brand?.slug ?? ''

    if (brandName.length > 0 && brandSlugValue.length > 0) {
      items.push({
        name: brandName,
        slug: `/remont-akpp-${brandSlugValue}`,
      })
    }

    return items
  }),
})
</script>

<template>
  <Why
    :image_source="landingData?.model?.image_source ?? ''"
    :image_alt="landingData?.model?.image_alt ?? ''" />
  <LazyRepairQuizBlock hydrate-on-visible />
  <ServiceAndCaseSection />
  <Article>
    {{ pageContent }}
  </Article>
  <LazyFaqAndReviews :route-landing-id="landingData?.id" hydrate-on-visible />
</template>
