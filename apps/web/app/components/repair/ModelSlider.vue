<script setup lang="ts">
import { getModels } from '#server/api/models/models.get'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/navigation'

const swiperModules = [Navigation]
const models = getModels()
</script>

<template>
  <div class="relative mx-auto max-w-5xl">
    <Swiper
      :modules="swiperModules"
      :loop="false"
      :slides-per-view="5"
      :slides-per-group="1"
      :space-between="16"
      :navigation="true"
      :watch-overflow="true"
      class="model-slider relative">
      <SwiperSlide v-for="model in models" :key="model.id">
        <SliderItem
          :title="model.title"
          :href="model.href"
          :source="model.logo.source"
          :alt="model.logo.alt ?? model.title"
          sizes="200px"
          class="h-50 w-50" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
.model-slider {
  --swiper-navigation-color: var(--color-brand-red);
}

.model-slider :deep(.swiper-button-prev),
.model-slider :deep(.swiper-button-next) {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.model-slider:hover :deep(.swiper-button-prev),
.model-slider:hover :deep(.swiper-button-next) {
  opacity: 1;
  pointer-events: auto;
}

.model-slider :deep(.swiper-button-lock) {
  display: none;
}

.model-slider :deep(.swiper-button-disabled) {
  color: var(--color-brand-grey-light);
  border-color: var(--color-brand-grey-light);
}
</style>
