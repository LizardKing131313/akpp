<script setup lang="ts">
definePageMeta({
  pageHeader: {
    kind: 'hero',
  },
})
</script>

<template>
  <BrandsGrid baseHref="remont-akpp-" />
  <ServicesSection />
  <LazyRepairQuizBlock hydrate-on-visible />
  <ServiceAndCaseSection />
  <LazyPerksSection hydrate-on-visible />
  <LazyFaqAndReviews :show-on-homepage="true" hydrate-on-visible />
</template>
