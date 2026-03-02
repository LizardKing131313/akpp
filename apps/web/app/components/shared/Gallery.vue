<script setup lang="ts">
import type { ItemImage } from '#shared/types/components/image'

import { computed, ref } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'

interface GalleryProps {
  images: ItemImage[]
}

const props = defineProps<GalleryProps>()

const activeIndex = ref<number>(0)
const visible = ref<boolean>(false)

const lightboxImages = computed<string[]>(() => {
  return props.images.map((imageItem) => imageItem.source)
})

const openLightbox = (index: number): void => {
  activeIndex.value = index
  visible.value = true
}

const closeLightbox = (): void => {
  visible.value = false
}
</script>

<template>
  <div class="w-full px-1">
    <button
      type="button"
      class="bg-brand-white aspect-4/3 w-full cursor-pointer overflow-hidden focus:outline-none"
      @click="openLightbox(activeIndex)">
      <NuxtImg
        :src="props.images[activeIndex]?.source"
        :alt="props.images[activeIndex]?.alt ?? ''"
        class="h-full w-full object-contain" />
    </button>

    <div class="mt-4 grid grid-cols-3 gap-3">
      <button
        v-for="(imageItem, index) in props.images"
        :key="imageItem.source"
        type="button"
        class="border-brand-soft bg-brand-white overflow-hidden rounded-lg border transition"
        :class="
          index === activeIndex ? 'ring-brand-red ring-2' : 'hover:border-brand-grey-light/60'
        "
        @click="activeIndex = index">
        <NuxtImg
          :src="imageItem.source"
          :alt="imageItem.alt ?? ''"
          class="h-16 w-full object-contain sm:h-18" />
      </button>
    </div>

    <VueEasyLightbox
      :visible="visible"
      :imgs="lightboxImages"
      :index="activeIndex"
      teleport="body"
      @hide="closeLightbox" />
  </div>
</template>
