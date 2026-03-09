<script setup lang="ts">
const routePageSettings = useRoutePageSettingsUi()

usePageEntityBreadcrumbs({
  title: () => routePageSettings.value.breadcrumb_sale_label,
  baseItems: () => [{ name: routePageSettings.value.breadcrumb_home_label, slug: '/' }],
})
</script>

<template>
  <ShopSection />
</template>
