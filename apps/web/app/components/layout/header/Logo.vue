<script setup lang="ts">
import type { HeaderSettings } from '#shared/types/header'

import { normalizeAppPath } from '#shared/lib/route'
import { computed } from 'vue'

import { useHeaderSettings } from '~/composables/useRepoApi'

const { data: settingsData } = await useHeaderSettings()
const settings = computed<HeaderSettings>(() => settingsData.value ?? ({} as HeaderSettings))
</script>

<template>
  <div>
    <NuxtLink :to="normalizeAppPath(settings.logo_href)">
      <CmsImage
        :src="settings.logo_source"
        :alt="settings.logo_alt"
        class="hidden h-auto w-65 lg:block" />

      <CmsImage
        :src="settings.logo_source_mobile"
        :alt="settings.logo_alt"
        class="h-auto w-23.75 lg:hidden" />
    </NuxtLink>
  </div>
</template>
