<script setup lang="ts">
definePageMeta({
  pageHeader: {
    kind: 'hero',
  },
})
</script>

<template>
  <BrandsGrid />
  <ServicesSection />
  <LazyRepairQuizBlock hydrate-on-visible />
  <ServiceAndCaseSection />
  <LazyPerksSection hydrate-on-visible />
  <LazyFaqAndReviews hydrate-on-visible />
</template>
