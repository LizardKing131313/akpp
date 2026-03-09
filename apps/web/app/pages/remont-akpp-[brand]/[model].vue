<script setup lang="ts">
import { computed } from 'vue'

import { applyTemplate } from '~/utils/template'

const route = useRoute()
const routePageSettings = useRoutePageSettingsUi()

const brandSlug = computed<string>(() => String(route.params.brand ?? '').trim())
const modelSlug = computed<string>(() => String(route.params.model ?? '').trim())

const { data: brandData, error: brandError } = await useBrandBySlug(brandSlug)
if (brandError.value) {
  throw brandError.value
}

const { data: modelData, error: modelError } = await useModelBySlug(modelSlug)
if (modelError.value) {
  throw modelError.value
}

if (!brandData.value || !modelData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

if (modelData.value.brand_id !== brandData.value.id) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Model does not belong to brand',
  })
}

const pageFallbackSlugs = computed<string[]>(() => {
  const currentBrandSlug = brandSlug.value
  const currentModelSlug = modelSlug.value

  if (currentBrandSlug.length === 0 || currentModelSlug.length === 0) {
    return []
  }

  return [`remont-akpp-${currentBrandSlug}/${currentModelSlug}`, `remont-akpp-${currentBrandSlug}`]
})

const { data: resolvedPageData } = await usePageBySlugFallback(pageFallbackSlugs)

const templateValues = computed<Record<string, string>>(() => ({
  brand: brandData.value?.name ?? '',
  model: modelData.value?.name ?? '',
  service: '',
}))

const pageTitle = computed<string>(() => {
  return (
    resolvedPageData.value?.page?.h1 ??
    applyTemplate(routePageSettings.value.repair_model_h1_template, templateValues.value)
  )
})

const pageContent = computed<string>(() => {
  return (
    resolvedPageData.value?.page?.content ??
    applyTemplate(routePageSettings.value.repair_model_content_template, templateValues.value)
  )
})

usePageEntityBreadcrumbs({
  title: pageTitle,
  baseItems: computed(() => [
    { name: routePageSettings.value.breadcrumb_home_label, slug: '/' },
    { name: routePageSettings.value.breadcrumb_repair_label },
    {
      name: brandData.value?.name ?? '',
      slug: `/remont-akpp-${brandSlug.value}`,
    },
  ]),
})

useSeoMeta({
  title: () =>
    resolvedPageData.value?.page?.seo_title ??
    applyTemplate(routePageSettings.value.repair_model_seo_title_template, templateValues.value),
  description: () =>
    resolvedPageData.value?.page?.seo_description ??
    applyTemplate(
      routePageSettings.value.repair_model_seo_description_template,
      templateValues.value
    ),
})
</script>

<template>
  <Why />
  <RepairQuizBlock />
  <ServiceAndCaseSection />
  <Article>
    {{ pageContent }}
  </Article>
  <FaqAndReviews />
</template>
