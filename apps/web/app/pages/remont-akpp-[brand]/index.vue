<script setup lang="ts">
import type { ModelItem } from '#shared/types/model'

import { computed } from 'vue'

import { applyTemplate } from '~/utils/template'

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

const pageFallbackSlugs = computed<string[]>(() => {
  const currentBrandSlug = brandSlug.value

  if (currentBrandSlug.length === 0) {
    return []
  }

  return [`remont-akpp-${currentBrandSlug}`]
})

const { data: resolvedPageData } = await usePageBySlugFallback(pageFallbackSlugs)

const templateValues = computed<Record<string, string>>(() => ({
  brand: brandData.value?.name ?? '',
  model: '',
  service: '',
}))

const pageTitle = computed<string>(() => {
  return (
    resolvedPageData.value?.page?.h1 ??
    applyTemplate(routePageSettings.value.repair_brand_h1_template, templateValues.value)
  )
})

const pageContent = computed<string>(() => {
  return (
    resolvedPageData.value?.page?.content ??
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
    resolvedPageData.value?.page?.seo_title ??
    applyTemplate(routePageSettings.value.repair_brand_seo_title_template, templateValues.value),
  description: () =>
    resolvedPageData.value?.page?.seo_description ??
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
