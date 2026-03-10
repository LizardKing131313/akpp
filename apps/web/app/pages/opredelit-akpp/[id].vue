<script setup lang="ts">
import { computed } from 'vue'

const pageTitle = computed<string>(() => 'Определить АКПП')

usePageEntityBreadcrumbs({
  title: pageTitle,
  baseItems: computed(() => [{ name: 'Главная', slug: '/' }]),
})
</script>

<template>
  <Article>
    {{ pageTitle }}
  </Article>
</template>
