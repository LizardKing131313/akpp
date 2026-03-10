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
const resolvedImage = computed(() => resolveCmsImageView(props.src))
</script>

<template>
  <NuxtImg :src="resolvedImage.nuxtSrc" :alt="alt ?? ''" quality="75" v-bind="attrs" />
</template>
