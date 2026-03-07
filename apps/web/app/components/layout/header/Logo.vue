<script setup lang="ts">
import { useHeaderUiSettings } from '~/composables/useHeaderUiSettings'

const settings = useHeaderUiSettings()
</script>

<template>
  <div>
    <NuxtLink :to="settings.logo_href">
      <NuxtImg
        :src="settings.logo_source"
        :alt="settings.logo_alt"
        width="260"
        height="40"
        class="hidden lg:block" />

      <NuxtImg
        :src="settings.logo_source_mobile"
        :alt="settings.logo_alt"
        width="95"
        height="40"
        class="lg:hidden" />
    </NuxtLink>
  </div>
</template>
