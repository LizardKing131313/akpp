<script setup lang="ts">
import { computed, ref } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'

const props = defineProps<{ images: ImageListItem[] }>()
const runtimeConfig = useRuntimeConfig()

const activeIndex = ref<number>(0)
const visible = ref<boolean>(false)

const resolveAssetUrl = (assetId: string | null | undefined): string | null => {
  if (!assetId) return null

  if (/^(?:https?:)?\/\//.test(assetId) || assetId.startsWith('/')) {
    return assetId
  }

  const directusUrl = runtimeConfig.public.directusUrl.replace(/\/+$/, '')
  return `${directusUrl}/assets/${assetId}`
}

const activeSrc = computed<string | null>(() => {
  return props.images[activeIndex.value]?.directus_files_id ?? null
})

const displayImages = computed<string[]>(() => {
  return props.images
    .map((item) => resolveAssetUrl(item.directus_files_id))
    .filter((item): item is string => Boolean(item))
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
      <CmsImage v-if="activeSrc" :src="activeSrc" class="h-full w-full object-contain" />
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

    <VueEasyLightbox
      v-if="visible"
      :visible="visible"
      :imgs="displayImages"
      :index="activeIndex"
      teleport="body"
      @hide="closeLightbox" />
  </div>
</template>
