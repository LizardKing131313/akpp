<script setup lang="ts">
import type { HeaderSettings } from '#shared/types/header'
import type { HeroItem } from '#shared/types/hero'

import { computed } from 'vue'

import { useSignupModal } from '~/composables/modal/useSignupModal'
import { useActiveCity } from '~/composables/useActiveCity'
import { useHeaderSettings, useHeroes } from '~/composables/useRepoApi'

const LazyHeroCarousel = defineLazyHydrationComponent('idle', () => import('./HeroCarousel.vue'))

const { data: settingsData } = await useHeaderSettings()
const settings = computed<HeaderSettings>(() => settingsData.value ?? ({} as HeaderSettings))
const activeCity = useActiveCity()
const cityId = computed<string | undefined>(() => activeCity.value?.id)

const handleClick = (): void => {
  useSignupModal().openModal()
}

const { data: heroesData } = useHeroes(cityId)
const slides = computed<HeroItem[]>(() => heroesData.value ?? [])
</script>

<template>
  <section class="relative w-full overflow-hidden">
    <LazyHeroCarousel
      :slides="slides"
      :settings="settings"
      :hydrate-on-idle="2000"
      @cta-click="handleClick" />
  </section>
</template>
