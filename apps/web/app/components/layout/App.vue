<script setup lang="ts">
const LazyFooterSection = defineLazyHydrationComponent(
  'visible',
  () => import('~/components/layout/footer/FooterSection.vue')
)
</script>

<template>
  <div class="bg-brand-white text-brand-dark flex min-h-dvh flex-col overflow-x-hidden text-xl">
    <HeaderSection />

    <Section>
      <slot />
    </Section>

    <LazyFooterSection class="mt-auto" :hydrate-on-visible="{ rootMargin: '300px' }" />
  </div>

  <ModalHost />
</template>
