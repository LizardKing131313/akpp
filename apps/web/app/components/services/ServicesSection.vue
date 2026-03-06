<script setup lang="ts">
withDefaults(defineProps<{ title?: string; items?: ServiceItem[] }>(), {
  title: 'Наши услуги',
  items: () => [],
})
</script>

<template>
  <div class="space-y-8">
    <CenteredTitle>{{ title }}</CenteredTitle>

    <div class="grid grid-cols-2 gap-8 lg:grid-cols-5">
      <ServiceCard v-for="service in items" :key="service.id" :service />
    </div>
  </div>
</template>
