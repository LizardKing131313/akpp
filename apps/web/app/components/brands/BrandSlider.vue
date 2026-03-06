<script setup lang="ts">
import { getBrands } from '#server/api/brands/index.get'
import { Autoplay, FreeMode, Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/free-mode'

const swiperModules = [Autoplay, FreeMode, Mousewheel]

const brands = getBrands()
</script>

<template>
  <div class="mx-auto flex max-w-6xl items-center justify-center px-4">
    <div class="brands-marquee-wrapper w-full pb-4">
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
        <SwiperSlide v-for="brand in brands" :key="brand.id" class="w-auto!">
          <SliderItem v-bind="brand" />
        </SwiperSlide>
      </Swiper>
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
