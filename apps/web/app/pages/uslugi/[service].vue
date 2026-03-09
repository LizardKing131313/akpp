<script setup lang="ts">
import type { BrandItem } from '#shared/types/brand'

import { computed } from 'vue'

import { applyTemplate } from '~/utils/template'

const route = useRoute()
const serviceSlug = computed<string>(() => String(route.params.service ?? '').trim())
const routePageSettings = useRoutePageSettingsUi()

const { data: serviceData, error: serviceError } = await useServiceBySlug(serviceSlug)
if (serviceError.value) {
  throw serviceError.value
}

if (!serviceData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Service not found',
  })
}

const { data: brandsData } = await useBrands()

const brandsForService = computed<BrandItem[]>(() => {
  const currentServiceSlug = serviceSlug.value
  const items = brandsData.value ?? []

  if (currentServiceSlug.length === 0) {
    return []
  }

  return items.map((brand) => ({
    ...brand,
    slug: `/uslugi/${currentServiceSlug}/${brand.slug}`,
  }))
})

const { data: routePageOverrideData } = await useRoutePageOverride('service', () => ({
  serviceId: serviceData.value?.id,
}))

const templateValues = computed<Record<string, string>>(() => ({
  brand: '',
  model: '',
  service: serviceData.value?.name ?? '',
}))

const pageTitle = computed<string>(() => {
  return (
    routePageOverrideData.value?.h1 ??
    applyTemplate(routePageSettings.value.service_h1_template, templateValues.value)
  )
})

const pageContent = computed<string>(() => {
  return (
    routePageOverrideData.value?.content ??
    applyTemplate(routePageSettings.value.service_content_template, templateValues.value)
  )
})

usePageEntityBreadcrumbs({
  title: pageTitle,
  baseItems: computed(() => [
    { name: routePageSettings.value.breadcrumb_home_label, slug: '/' },
    { name: routePageSettings.value.breadcrumb_services_label },
  ]),
})

useSeoMeta({
  title: () =>
    routePageOverrideData.value?.seo_title ??
    applyTemplate(routePageSettings.value.service_seo_title_template, templateValues.value),
  description: () =>
    routePageOverrideData.value?.seo_description ??
    applyTemplate(routePageSettings.value.service_seo_description_template, templateValues.value),
})
</script>

<template>
  <BrandsGrid :brands="brandsForService" />
  <RepairQuizBlock />
  <ServiceAndCaseSection />
  <Article>
    {{ pageContent }}
  </Article>
  <FaqAndReviews />
</template>
