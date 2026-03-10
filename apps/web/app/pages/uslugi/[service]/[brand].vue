<script setup lang="ts">
import { applyTemplate } from '#shared/lib/template'
import { computed } from 'vue'

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

const { data: serviceBrandExistsData, error: serviceBrandExistsError } =
  await useServiceBrandExists(() => ({
    serviceId: serviceData.value?.id,
    brandId: brandData.value?.id,
  }))

if (serviceBrandExistsError.value) {
  throw serviceBrandExistsError.value
}

if (!serviceBrandExistsData.value?.exists) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Service is not available for this brand',
  })
}

const { data: routePageOverrideData } = await useRoutePageOverride('service_brand', () => ({
  serviceId: serviceData.value?.id,
  brandId: brandData.value?.id,
}))

const templateValues = computed<Record<string, string>>(() => ({
  brand: brandData.value?.name ?? '',
  model: '',
  service: serviceData.value?.name ?? '',
}))

const pageTitle = computed<string>(() => {
  return (
    routePageOverrideData.value?.h1 ??
    applyTemplate(routePageSettings.value.service_brand_h1_template, templateValues.value)
  )
})

const pageContent = computed<string>(() => {
  return (
    routePageOverrideData.value?.content ??
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
    routePageOverrideData.value?.seo_title ??
    applyTemplate(routePageSettings.value.service_brand_seo_title_template, templateValues.value),
  description: () =>
    routePageOverrideData.value?.seo_description ??
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
