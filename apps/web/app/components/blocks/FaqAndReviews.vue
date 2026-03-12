<script setup lang="ts">
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

    <ClientOnly>
      <YandexReviews />
    </ClientOnly>
  </TwoColumns>
</template>
