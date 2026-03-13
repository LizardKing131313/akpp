<script setup lang="ts">
const LazyFaqReviewsWidget = defineLazyHydrationComponent(
  'visible',
  () => import('./FaqReviewsWidget.client.vue')
)

withDefaults(
  defineProps<{
    title?: string | undefined
    routeLandingId?: string | undefined
    showOnHomepage?: boolean | undefined
  }>(),
  {
    title: 'Полезная информация',
  }
)
</script>

<template>
  <CenteredTitle>{{ title }}</CenteredTitle>

  <TwoColumns>
    <FaqSection :route-landing-id="routeLandingId" :show-on-homepage="showOnHomepage" />

    <LazyFaqReviewsWidget :hydrate-on-visible="{ rootMargin: '200px' }" />
  </TwoColumns>
</template>
