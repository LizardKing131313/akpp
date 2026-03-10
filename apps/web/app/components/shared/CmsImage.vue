<script setup lang="ts">
import { useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  src: string
  alt?: string | undefined
}>()

const attrs = useAttrs()
</script>

<template>
  <NuxtImg :src="src" :alt="alt ?? ''" quality="75" v-bind="attrs" />
</template>
