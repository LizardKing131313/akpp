<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  src: string
  alt?: string | undefined
  mimeType?: string | undefined
}>()

const attrs = useAttrs()
const image = useImage()

const mimeMap = await useCmsImageMimeMap(() => [props.src])
const resolvedImage = computed(() =>
  resolveCmsImageView(props.src, {
    mimeType: props.mimeType ?? mimeMap.value[props.src.trim()] ?? null,
    image,
  })
)
</script>

<template>
  <img
    v-if="resolvedImage.shouldBypassIpx"
    :src="resolvedImage.directSrc"
    :alt="alt ?? ''"
    v-bind="attrs" />
  <NuxtImg v-else :src="resolvedImage.ipxSrc" :alt="alt ?? ''" v-bind="attrs" />
</template>
