<script setup lang="ts">
import { PAGE_LABELS } from '#shared/constants/page-labels'
import { computed } from 'vue'

import { useSimplePagePresentation } from '~/composables/useSimplePagePresentation'

const { data: articlesData } = await useArticles()
const route = useRoute()

const articlesPerPage = 9

const pageTitle = computed<string>(() => PAGE_LABELS.articles)
const pageDescription = computed<string>(
  () =>
    `Полезные статьи по ремонту АКПП, вариаторов и DSG:
    признаки неисправностей, диагностика, обслуживание и практические рекомендации.`
)

useSimplePagePresentation({
  title: pageTitle,
  description: pageDescription,
  baseItems: computed(() => [{ name: 'Главная', slug: '/' }]),
})

const totalPages = computed<number>(() => {
  const itemsCount = articlesData.value?.length ?? 0
  return Math.max(1, Math.ceil(itemsCount / articlesPerPage))
})

const currentPage = computed<number>(() => {
  const rawValue = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page
  const parsedValue = Number.parseInt(String(rawValue ?? '1'), 10)

  if (!Number.isFinite(parsedValue) || parsedValue < 1) {
    return 1
  }

  return Math.min(parsedValue, totalPages.value)
})

const paginatedArticles = computed(() => {
  const items = articlesData.value ?? []
  const startIndex = (currentPage.value - 1) * articlesPerPage

  return items.slice(startIndex, startIndex + articlesPerPage)
})
</script>

<template>
  <Breadcrumbs />
  <Section>
    <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
      <ArticleGridCard
        v-for="articleItem in paginatedArticles"
        :key="articleItem.id"
        :articleItem />
    </div>

    <AppPagination base-path="/articles" :current-page="currentPage" :total-pages="totalPages" />
  </Section>
</template>
