<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'

const props = defineProps<{ images: ImageListItem[] }>()
const AsyncLightbox = defineAsyncComponent(() => import('vue-easy-lightbox'))

const activeIndex = ref<number>(0)
const visible = ref<boolean>(false)

const activeSrc = computed<string | null>(
  () => props.images[activeIndex.value]?.directus_files_id ?? null
)

const displayImages = computed<string[]>(() => props.images.map((item) => item.directus_files_id))

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
      <img v-if="activeSrc" :src="activeSrc" alt="" class="h-full w-full object-contain" />
    </button>

    <div class="mt-4 grid grid-cols-3 gap-3">
      <button
        v-for="(imageItem, itemIndex) in images"
        :key="imageItem.id"
        type="button"
        class="border-brand-soft bg-brand-white overflow-hidden rounded-lg border transition"
        :class="
          itemIndex === activeIndex ? 'ring-brand-red ring-2' : 'hover:border-brand-grey-light/60'
        "
        @click="activeIndex = itemIndex">
        <CmsImage :src="imageItem.directus_files_id" class="h-16 w-full object-contain sm:h-18" />
      </button>
    </div>

    <component
      :is="AsyncLightbox"
      v-if="visible"
      :visible="visible"
      :imgs="displayImages"
      :index="activeIndex"
      teleport="body"
      @hide="closeLightbox" />
  </div>
</template>
