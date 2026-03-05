<script setup lang="ts">
import { computed, ref } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'

const props = defineProps<{ images: string[] }>()

const activeIndex = ref<number>(0)
const visible = ref<boolean>(false)

const activeSrc = computed<string | null>(() => {
  const value = props.images[activeIndex.value]
  return value ?? null
})

const openLightbox = (index: number): void => {
  if (props.images.length === 0) return
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
      :disabled="!activeSrc"
      @click="openLightbox(activeIndex)">
      <NuxtImg v-if="activeSrc" :src="activeSrc" class="h-full w-full object-contain" />
    </button>

    <div class="mt-4 grid grid-cols-3 gap-3">
      <button
        v-for="(imageItem, index) in images"
        :key="imageItem"
        type="button"
        class="border-brand-soft bg-brand-white overflow-hidden rounded-lg border transition"
        :class="
          index === activeIndex ? 'ring-brand-red ring-2' : 'hover:border-brand-grey-light/60'
        "
        @click="activeIndex = index">
        <NuxtImg :src="imageItem" class="h-16 w-full object-contain sm:h-18" />
      </button>
    </div>

    <VueEasyLightbox
      :visible="visible"
      :imgs="images"
      :index="activeIndex"
      teleport="body"
      @hide="closeLightbox" />
  </div>
</template>
