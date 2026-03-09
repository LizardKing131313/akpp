<script setup lang="ts">
import { computed } from 'vue'

import { applyTemplate } from '~/utils/template'

const route = useRoute()
const routePageSettings = useRoutePageSettingsUi()

const serviceSlug = computed<string>(() => String(route.params.service ?? '').trim())
const brandSlug = computed<string>(() => String(route.params.brand ?? '').trim())

const { data: serviceData, error: serviceError } = await useServiceBySlug(serviceSlug)
if (serviceError.value) {
  throw serviceError.value
}

const { data: brandData, error: brandError } = await useBrandBySlug(brandSlug)
if (brandError.value) {
  throw brandError.value
}

if (!serviceData.value || !brandData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

const pageFallbackSlugs = computed<string[]>(() => {
  const currentServiceSlug = serviceSlug.value
  const currentBrandSlug = brandSlug.value

  if (currentServiceSlug.length === 0 || currentBrandSlug.length === 0) {
    return []
  }

  return [`uslugi/${currentServiceSlug}/${currentBrandSlug}`, `uslugi/${currentServiceSlug}`]
})

const { data: resolvedPageData } = await usePageBySlugFallback(pageFallbackSlugs)

const templateValues = computed<Record<string, string>>(() => ({
  brand: brandData.value?.name ?? '',
  model: '',
  service: serviceData.value?.name ?? '',
}))

const pageTitle = computed<string>(() => {
  return (
    resolvedPageData.value?.page?.h1 ??
    applyTemplate(routePageSettings.value.service_brand_h1_template, templateValues.value)
  )
})

const pageContent = computed<string>(() => {
  return (
    resolvedPageData.value?.page?.content ??
    applyTemplate(routePageSettings.value.service_brand_content_template, templateValues.value)
  )
})

usePageEntityBreadcrumbs({
  title: pageTitle,
  baseItems: computed(() => [
    { name: routePageSettings.value.breadcrumb_home_label, slug: '/' },
    { name: routePageSettings.value.breadcrumb_services_label },
    {
      name: serviceData.value?.name ?? '',
      slug: `/uslugi/${serviceSlug.value}`,
    },
  ]),
})

useSeoMeta({
  title: () =>
    resolvedPageData.value?.page?.seo_title ??
    applyTemplate(routePageSettings.value.service_brand_seo_title_template, templateValues.value),
  description: () =>
    resolvedPageData.value?.page?.seo_description ??
    applyTemplate(
      routePageSettings.value.service_brand_seo_description_template,
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
