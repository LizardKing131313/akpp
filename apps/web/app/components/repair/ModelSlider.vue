<script setup lang="ts">
import type { ModelItem } from '#shared/types/model'

import { normalizeAppPath } from '#shared/lib/route'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed } from 'vue'

import 'swiper/css'
import 'swiper/css/navigation'

const swiperModules = [Navigation]

const props = withDefaults(defineProps<{ items?: ModelItem[] }>(), { items: () => [] })

const { data: modelsData } = await useModels()

const resolvedItems = computed<ModelItem[]>(() => {
  if (props.items.length > 0) {
    return props.items
  }

  return modelsData.value ?? []
})
</script>

<template>
  <div class="relative mx-auto max-w-6xl">
    <Swiper
      :modules="swiperModules"
      :loop="false"
      :slides-per-view="1"
      :slides-per-group="1"
      :space-between="16"
      :navigation="true"
      :watch-overflow="true"
      :breakpoints="{
        640: { slidesPerView: 2, spaceBetween: 14 },
        768: { slidesPerView: 3, spaceBetween: 16 },
        1024: { slidesPerView: 4, spaceBetween: 16 },
        1280: { slidesPerView: 5, spaceBetween: 16 },
      }"
      class="model-slider relative">
      <SwiperSlide v-for="model in resolvedItems" :key="model.id">
        <SliderItem
          v-bind="model"
          :to="normalizeAppPath(model.slug)"
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

.model-slider :deep(.swiper-button-prev),
.model-slider :deep(.swiper-button-next) {
  display: none;
}

@media (min-width: 768px) {
  .model-slider :deep(.swiper-button-prev),
  .model-slider :deep(.swiper-button-next) {
    display: flex;
  }
}
</style>
