<script setup lang="ts">
import { computed } from 'vue'

const routePageSettings = useRoutePageSettingsUi()

const pageTitle = computed<string>(() => routePageSettings.value.breadcrumb_determine_label)

usePageEntityBreadcrumbs({
  title: pageTitle,
  baseItems: computed(() => [{ name: routePageSettings.value.breadcrumb_home_label, slug: '/' }]),
})
</script>

<template>
  <Article>
    {{ pageTitle }}
  </Article>
</template>
