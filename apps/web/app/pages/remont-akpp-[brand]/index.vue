<script setup lang="ts">
import type { ModelItem } from '#shared/types/model'

import { applyTemplate } from '#shared/lib/template'
import { computed } from 'vue'

const route = useRoute()
const brandSlug = computed<string>(() => String(route.params.brand ?? '').trim())
const routePageSettings = useRoutePageSettingsUi()

const { data: brandData, error: brandError } = await useBrandBySlug(brandSlug)
if (brandError.value) {
  throw brandError.value
}

if (!brandData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Brand not found',
  })
}

const { data: modelsData } = await useModels()

const modelSliderItems = computed<ModelItem[]>(() => {
  const brandId = brandData.value?.id
  const brandRouteSlug = brandSlug.value
  const items = modelsData.value ?? []

  if (!brandId || brandRouteSlug.length === 0) {
    return []
  }

  return items
    .filter((model) => model.brand_id === brandId)
    .map((model) => ({
      ...model,
      slug: `/remont-akpp-${brandRouteSlug}/${model.slug}`,
    }))
})

const { data: routePageOverrideData } = await useRoutePageOverride('repair_brand', () => ({
  brandId: brandData.value?.id,
}))

const templateValues = computed<Record<string, string>>(() => ({
  brand: brandData.value?.name ?? '',
  model: '',
  service: '',
}))

const pageTitle = computed<string>(() => {
  return (
    routePageOverrideData.value?.h1 ??
    applyTemplate(routePageSettings.value.repair_brand_h1_template, templateValues.value)
  )
})

const pageContent = computed<string>(() => {
  return (
    routePageOverrideData.value?.content ??
    applyTemplate(routePageSettings.value.repair_brand_content_template, templateValues.value)
  )
})

usePageEntityBreadcrumbs({
  title: pageTitle,
  baseItems: computed(() => [
    { name: routePageSettings.value.breadcrumb_home_label, slug: '/' },
    { name: routePageSettings.value.breadcrumb_repair_label },
  ]),
})

useSeoMeta({
  title: () =>
    routePageOverrideData.value?.seo_title ??
    applyTemplate(routePageSettings.value.repair_brand_seo_title_template, templateValues.value),
  description: () =>
    routePageOverrideData.value?.seo_description ??
    applyTemplate(
      routePageSettings.value.repair_brand_seo_description_template,
      templateValues.value
    ),
})
</script>

<template>
  <Why />
  <ModelSlider :items="modelSliderItems" />
  <RepairQuizBlock />
  <ServiceAndCaseSection />
  <Article>
    {{ pageContent }}
  </Article>
  <FaqAndReviews />
</template>
