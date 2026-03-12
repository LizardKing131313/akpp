<script setup lang="ts">
import { PAGE_LABELS } from '#shared/constants/page-labels'
import { computed } from 'vue'

import { useSimplePagePresentation } from '~/composables/useSimplePagePresentation'

const route = useRoute()
const caseSlug = computed<string>(() => String(route.params.id ?? '').trim())

const { data: caseData } = await useCaseBySlug(caseSlug)
const pageTitle = computed<string>(() => caseData.value?.name ?? PAGE_LABELS.case)
const requestUrl = useRequestURL()

useSimplePagePresentation({
  title: pageTitle,
  description: computed(() => caseData.value?.reason ?? pageTitle.value),
  image: computed(() => caseData.value?.image_source ?? ''),
  type: 'article',
  baseItems: computed(() => [
    { name: 'Главная', slug: '/' },
    { name: PAGE_LABELS.cases, slug: '/work' },
  ]),
})

const caseJsonLd = computed<Record<string, unknown> | null>(() => {
  if (!caseData.value) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseData.value.name,
    description: caseData.value.reason,
    image: caseData.value.image_source
      ? [new URL(caseData.value.image_source, requestUrl.origin).toString()]
      : undefined,
    datePublished: caseData.value.case_date || undefined,
    articleSection: 'Кейсы по ремонту АКПП',
    about: [caseData.value.brand?.name, caseData.value.transmission, caseData.value.engine].filter(
      Boolean
    ),
    mainEntityOfPage: new URL(`/work/${caseData.value.slug}`, requestUrl.origin).toString(),
  }
})

useHead(() => {
  if (caseJsonLd.value === null) {
    return {}
  }

  return {
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(caseJsonLd.value),
      },
    ],
  }
})
</script>

<template>
  <Breadcrumbs />
  <Section>
    <CaseItem v-if="caseData" :caseItem="caseData" />
  </Section>
</template>
