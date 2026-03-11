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
const runtimeConfig = useRuntimeConfig()

const resolvedSrc = computed<string>(() => {
  if (!props.src) return ''

  const directusUrl = runtimeConfig.public.directusUrl.replace(/\/+$/, '')
  return `${directusUrl}/assets/${props.src}`
})
</script>

<template>
  <NuxtImg v-if="resolvedSrc" :src="resolvedSrc" :alt="alt ?? ''" v-bind="attrs" />
</template>
