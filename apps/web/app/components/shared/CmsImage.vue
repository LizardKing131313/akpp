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

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const isDirectusFileId = computed<boolean>(() => UUID_PATTERN.test(props.src.trim()))

const { data: resolvedMimeType } = await useAsyncData<string | null>(
  () => `file-mime:${props.src}`,
  async () => {
    if (props.mimeType || !isDirectusFileId.value) {
      return null
    }

    try {
      const response = await $fetch<{ mimeType: string | null }>(
        `/api/files/mime/${encodeURIComponent(props.src)}`
      )
      return response.mimeType
    } catch {
      return null
    }
  },
  {
    watch: [() => props.src, () => props.mimeType],
  }
)

const effectiveMimeType = computed<string | null>(
  () => props.mimeType ?? resolvedMimeType.value ?? null
)
const isGifBySource = computed<boolean>(() => /\.gif($|[?#])/i.test(props.src))
const isGifByMimeType = computed<boolean>(() => effectiveMimeType.value === 'image/gif')
const shouldBypassIpx = computed<boolean>(() => isGifBySource.value || isGifByMimeType.value)
</script>

<template>
  <img v-if="shouldBypassIpx" :src="src" :alt="alt ?? ''" v-bind="attrs" />
  <NuxtImg v-else :src="src" :alt="alt ?? ''" v-bind="attrs" />
</template>
