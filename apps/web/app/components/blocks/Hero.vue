<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { useSignupModal } from '#shared/lib/modal/useSignupModal'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed } from 'vue'

import 'swiper/css'
import 'swiper/css/navigation'

type HeroSlide = {
  id: string
  titleAccent?: string
  titleMain: string
  description: string
  buttonLabel: string
  buttonTo: string
  imageSrc: string
  imageAlt: string
}

interface HeroSliderProps {
  slides: HeroSlide[]
}

const props = defineProps<HeroSliderProps>()

const swiperModules = computed(() => [Autoplay, Navigation])

const { openSignupModal } = useSignupModal()

const handleClick = (): void => {
  openSignupModal('footer')
}
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
        <SwiperSlide v-for="slide in props.slides" :key="slide.id" class="relative h-full w-full">
          <NuxtImg
            :src="slide.imageSrc"
            :alt="slide.imageAlt"
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
                <span
                  v-if="slide.titleAccent && slide.titleAccent.length > 0"
                  class="text-brand-red">
                  {{ slide.titleAccent }}
                </span>
                <span v-if="slide.titleAccent && slide.titleAccent.length > 0" class="mr-4" />
                <span>{{ slide.titleMain }}</span>
              </h2>

              <p
                :class="
                  cn(`
                    text-surface-soft/70 mt-4 max-w-xl text-base
                    leading-relaxed sm:text-lg lg:max-w-6xl
                  `)
                ">
                {{ slide.description }}
              </p>

              <button
                :class="
                  cn(`
                    bg-brand-red text-surface-soft z-20 mx-auto mt-7 inline-flex
                    items-center justify-center rounded-full px-10 py-4 text-sm font-semibold
                    tracking-wide uppercase transition-transform
                    duration-200 hover:scale-[1.02] active:scale-[0.99] lg:mx-0
                  `)
                "
                type="button"
                @click="handleClick">
                {{ slide.buttonLabel }}
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div class="pointer-events-none absolute inset-0 z-20 hidden lg:block">
        <div class="relative mx-auto h-full max-w-6xl px-4">
          <button
            type="button"
            aria-label="Previous slide"
            :class="
              cn(`
                hero-slider-prev bg-surface-soft/25 text-surface-soft
                hover:bg-brand-grey-light pointer-events-auto absolute top-1/2 left-0 z-20
                flex h-14 w-14 -translate-x-16 -translate-y-1/2 cursor-pointer items-center
                justify-center rounded-full backdrop-blur-sm transition-colors duration-200
              `)
            ">
            <Arrow direction="left" class="text-surface-soft" />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            :class="
              cn(`
                hero-slider-next bg-surface-soft/25 text-surface-soft
                hover:bg-brand-grey-light pointer-events-auto absolute top-1/2 right-0 z-20
                flex h-14 w-14 translate-x-16 -translate-y-1/2 cursor-pointer items-center
                justify-center rounded-full backdrop-blur-sm transition-colors duration-200
              `)
            ">
            <Arrow direction="right" class="text-surface-soft" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
