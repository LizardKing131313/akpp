<script setup lang="ts">
import { computed } from 'vue'

const pageTitle = computed<string>(() => 'Продажа АКПП')

usePageEntityBreadcrumbs({
  title: pageTitle,
  baseItems: computed(() => [{ name: 'Главная', slug: '/' }]),
})
</script>

<template>
  <ShopSection />
</template>
