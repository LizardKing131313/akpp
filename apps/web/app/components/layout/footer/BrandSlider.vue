<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { Autoplay, FreeMode, Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/free-mode'

const swiperModules = [Autoplay, FreeMode, Mousewheel]

const brands: string[] = [
  '/images/brands/1.png',
  '/images/brands/2.png',
  '/images/brands/3.png',
  '/images/brands/4.png',
  '/images/brands/5.png',
  '/images/brands/6.png',
  '/images/brands/7.png',
  '/images/brands/8.png',
  '/images/brands/9.png',
  '/images/brands/10.png',
  '/images/brands/11.png',
  '/images/brands/12.png',
]
</script>

<template>
  <div class="bg-surface-base relative z-0 pt-24 pb-12 lg:pt-24">
    <div class="mx-auto flex max-w-6xl items-center justify-center px-4">
      <div class="brands-marquee-wrapper w-full pt-8 pb-4">
        <Swiper
          :modules="swiperModules"
          :slides-per-view="'auto'"
          :space-between="32"
          :loop="true"
          :speed="12000"
          :free-mode="{ enabled: true, momentum: true }"
          :autoplay="{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }"
          :mousewheel="{ forceToAxis: true }"
          class="brands-marquee w-full">
          <SwiperSlide v-for="brand in brands" :key="brand" class="w-auto!">
            <NuxtImg
              :src="brand"
              alt=""
              :class="
                cn(`
                  mx-8 h-16 w-16 transform-gpu cursor-pointer object-contain transition-transform
                  duration-300 ease-out will-change-transform
                  hover:-translate-y-1 hover:scale-110 hover:drop-shadow-md
                `)
              " />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<!--suppress CssUnusedSymbol -->
<style>
.brands-marquee-wrapper {
  overflow-x: hidden;
  overflow-y: visible;
}

.brands-marquee,
.brands-marquee .swiper-wrapper,
.brands-marquee .swiper-slide {
  overflow: visible !important;
}
</style>
