<script setup lang="ts">
import type { HeaderSettings } from '#shared/types/header'
import type { HeroItem } from '#shared/types/hero'

import { cn } from '#shared/lib/cn'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed } from 'vue'

import { useSignupModal } from '~/composables/modal/useSignupModal'
import { useActiveCity } from '~/composables/useActiveCity'
import { useHeaderSettings, useHeroes } from '~/composables/useRepoApi'

import 'swiper/css'
import 'swiper/css/navigation'

const swiperModules = computed(() => [Autoplay, Navigation])

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
    <div class="relative">
      <Swiper
        :modules="swiperModules"
        :loop="true"
        :speed="700"
        :autoplay="{ delay: 6000, disableOnInteraction: false }"
        :navigation="{ prevEl: '.hero-slider-prev', nextEl: '.hero-slider-next' }"
        class="relative h-100 w-full sm:h-110 lg:h-120">
        <SwiperSlide
          v-for="(slide, index) in slides"
          :key="slide.id"
          class="relative h-full w-full">
          <CmsImage
            :src="slide.image_source"
            :alt="slide.image_alt"
            :fetchpriority="index === 0 ? 'high' : undefined"
            :loading="index === 0 ? 'eager' : undefined"
            class="absolute inset-0 h-full w-full object-cover" />

          <div class="bg-brand-dark/60 absolute inset-0"></div>

          <div
            :class="
              cn(`
                from-brand-dark/70 via-brand-dark/40 absolute
                inset-0 bg-linear-to-r to-transparent
              `)
            "></div>

          <div class="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4">
            <div class="mx-auto max-w-6xl text-center lg:mx-0 lg:text-left">
              <h2
                :class="
                  cn(`
                    text-3xl leading-tight font-extrabold text-white
                    sm:text-4xl lg:text-5xl lg:whitespace-nowrap
                  `)
                ">
                <span>{{ slide.title_main }}</span>
                <span v-if="slide.title_accent && slide.title_accent.length > 0" class="mr-4" />
                <span
                  v-if="slide.title_accent && slide.title_accent.length > 0"
                  class="text-brand-red">
                  {{ slide.title_accent }}
                </span>
              </h2>

              <p
                :class="
                  cn(`
                    text-brand-soft/70 mt-4 max-w-xl text-base
                    leading-relaxed sm:text-lg lg:max-w-6xl
                  `)
                ">
                {{ slide.description }}
              </p>

              <MainButton
                @click="handleClick"
                class="z-20 mt-7 w-auto px-10 tracking-wide uppercase">
                {{ settings.hero_button_label }}
              </MainButton>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div class="pointer-events-none absolute inset-0 z-20 hidden lg:block">
        <div class="relative mx-auto h-full max-w-6xl px-4">
          <button
            type="button"
            :aria-label="settings.hero_prev_slide_aria_label"
            :class="
              cn(`
                hero-slider-prev bg-brand-soft/25 text-brand-soft
                hover:bg-brand-grey-light pointer-events-auto absolute top-1/2 left-0 z-20
                flex h-14 w-14 -translate-x-16 -translate-y-1/2 cursor-pointer items-center
                justify-center rounded-full backdrop-blur-sm transition-colors duration-200
              `)
            ">
            <Arrow direction="left" class="text-brand-soft" />
          </button>

          <button
            type="button"
            :aria-label="settings.hero_next_slide_aria_label"
            :class="
              cn(`
                hero-slider-next bg-brand-soft/25 text-brand-soft
                hover:bg-brand-grey-light pointer-events-auto absolute top-1/2 right-0 z-20
                flex h-14 w-14 translate-x-16 -translate-y-1/2 cursor-pointer items-center
                justify-center rounded-full backdrop-blur-sm transition-colors duration-200
              `)
            ">
            <Arrow direction="right" class="text-brand-soft" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
