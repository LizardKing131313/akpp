<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { Autoplay, FreeMode, Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/free-mode'

const swiperModules = [Autoplay, FreeMode, Mousewheel]

const brands: string[] = [
  '/images/brands/audi.png',
  '/images/brands/bmw.png',
  '/images/brands/changan.png',
  '/images/brands/chery.png',
  '/images/brands/citroen.png',
  '/images/brands/exeed.png',
  '/images/brands/ford.png',
  '/images/brands/gac.png',
  '/images/brands/geely.png',
  '/images/brands/haval.png',
  '/images/brands/honda.png',
  '/images/brands/hyundai.png',
  '/images/brands/jaecoo.png',
  '/images/brands/jeep.png',
  '/images/brands/kia.png',
  '/images/brands/lexus.png',
  '/images/brands/mazda.png',
  '/images/brands/mercedes.png',
  '/images/brands/mitsubishi.png',
  '/images/brands/nissan.png',
  '/images/brands/omoda.png',
  '/images/brands/opel.png',
  '/images/brands/peugeot.png',
  '/images/brands/renault.png',
  '/images/brands/shevrolet.png',
  '/images/brands/skoda.png',
  '/images/brands/ssangyong.png',
  '/images/brands/tank.png',
  '/images/brands/toyota.png',
  '/images/brands/volkswagen.png',
  '/images/brands/volvo.png',
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
