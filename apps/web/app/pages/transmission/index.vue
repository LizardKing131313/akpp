<script setup lang="ts">
const routePageSettings = useRoutePageSettingsUi()

usePageEntityBreadcrumbs({
  title: () => routePageSettings.value.breadcrumb_transmission_label,
  baseItems: () => [{ name: routePageSettings.value.breadcrumb_home_label, slug: '/' }],
})
</script>

<template>
  <BrandsGrid />
</template>
