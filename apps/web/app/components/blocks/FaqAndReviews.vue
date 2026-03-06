<script setup lang="ts">
withDefaults(defineProps<{ title?: string }>(), { title: 'Полезная информация' })
</script>

<template>
  <CenteredTitle>{{ title }}</CenteredTitle>

  <TwoColumns>
    <FaqSection />

    <ClientOnly>
      <YandexReviews />
    </ClientOnly>
  </TwoColumns>
</template>
