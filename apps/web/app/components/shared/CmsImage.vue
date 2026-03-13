<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  src: string
  alt?: string | undefined
}>()

const attrs = useAttrs()
const resolveDirectusAssetUrl = useDirectusAssetUrl()

const resolvedSrc = computed<string>(() => {
  return resolveDirectusAssetUrl(props.src) ?? ''
})
</script>

<template>
  <NuxtImg v-if="resolvedSrc" :src="resolvedSrc" :alt="alt ?? ''" v-bind="attrs" />
</template>
