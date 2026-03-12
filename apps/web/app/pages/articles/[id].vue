<script setup lang="ts">
import { PAGE_LABELS } from '#shared/constants/page-labels'
import { computed } from 'vue'

import { useSimplePagePresentation } from '~/composables/useSimplePagePresentation'

const route = useRoute()
const articleSlug = computed<string>(() => String(route.params.id ?? '').trim())

const { data: articleData } = await useArticleBySlug(articleSlug)
const pageTitle = computed<string>(() => articleData.value?.name ?? PAGE_LABELS.article)

const articleContent = computed<string>(() => {
  return articleData.value?.content ?? ''
})
const requestUrl = useRequestURL()
const articleJsonLd = computed<Record<string, unknown> | null>(() => {
  if (!articleData.value) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articleData.value.name,
    description: articleData.value.annotation,
    image: articleData.value.image_source
      ? [new URL(articleData.value.image_source, requestUrl.origin).toString()]
      : undefined,
    datePublished: articleData.value.date || undefined,
    mainEntityOfPage: new URL(`/articles/${articleData.value.slug}`, requestUrl.origin).toString(),
  }
})

useSimplePagePresentation({
  title: pageTitle,
  description: computed(() => articleData.value?.annotation ?? pageTitle.value),
  image: computed(() => articleData.value?.image_source ?? ''),
  type: 'article',
  baseItems: computed(() => [
    { name: 'Главная', slug: '/' },
    { name: PAGE_LABELS.articles, slug: '/articles' },
  ]),
})

useHead(() => {
  if (articleJsonLd.value === null) {
    return {}
  }

  return {
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(articleJsonLd.value),
      },
    ],
  }
})
</script>

<template>
  <Breadcrumbs />
  <Article>
    <div v-html="articleContent" />
  </Article>
</template>
