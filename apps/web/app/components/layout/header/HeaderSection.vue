<script setup lang="ts">
import { computed } from 'vue'

import { useActiveCity } from '~/composables/useActiveCity'
import { useHeaderUiSettings } from '~/composables/useHeaderUiSettings'
import { usePageHeaderMeta } from '~/composables/usePageHeaderMeta'

const settings = useHeaderUiSettings()
const { mode } = usePageHeaderMeta()

const activeCity = useActiveCity()
const city = computed<CityItem | undefined>(() => activeCity.value)

const isHero = computed<boolean>(() => mode.value === 'hero')
const isBreadcrumbs = computed<boolean>(() => mode.value === 'breadcrumbs')
</script>

<template>
  <header class="w-full">
    <TopBar />

    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:py-6">
      <Logo />

      <div class="flex items-center gap-0">
        <ContactCard
          :iconSource="settings.time_icon_source"
          :iconAlt="settings.time_icon_alt"
          :title="city?.work_hours_text ?? ''"
          :subtitle="city?.work_hours_subtext ?? ''"
          class="hidden lg:flex" />

        <ContactCard
          :iconSource="settings.phone_icon_source"
          :iconAlt="settings.phone_icon_alt"
          :title="city?.phone_number ?? ''"
          :subtitle="city?.phone_text ?? ''"
          linkType="tel"
          :href="city?.phone_number ?? ''"
          class="gap-1! px-0! lg:gap-3! lg:px-6!"
          titleClass="lg:text-lg! text-sm!"
          subtitleClass="hidden lg:block" />
      </div>
    </div>

    <Menu />
  </header>

  <Hero v-if="isHero" />

  <Breadcrumbs v-else-if="isBreadcrumbs" />
</template>
