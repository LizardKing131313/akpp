<script setup lang="ts">
import { applyTemplate } from '#shared/lib/template'
import { computed } from 'vue'

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

const { data: routePageOverrideData } = await useRoutePageOverride('repair_model', () => ({
  brandId: brandData.value?.id,
  modelId: modelData.value?.id,
}))

const templateValues = computed<Record<string, string>>(() => ({
  brand: brandData.value?.name ?? '',
  model: modelData.value?.name ?? '',
  service: '',
}))

const pageTitle = computed<string>(() => {
  return (
    routePageOverrideData.value?.h1 ??
    applyTemplate(routePageSettings.value.repair_model_h1_template, templateValues.value)
  )
})

const pageContent = computed<string>(() => {
  return (
    routePageOverrideData.value?.content ??
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
    routePageOverrideData.value?.seo_title ??
    applyTemplate(routePageSettings.value.repair_model_seo_title_template, templateValues.value),
  description: () =>
    routePageOverrideData.value?.seo_description ??
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
