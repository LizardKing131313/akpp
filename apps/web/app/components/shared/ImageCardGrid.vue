<script setup lang="ts">
import type { ImageCardItem } from '#shared/types/entity'

const props = withDefaults(defineProps<{ items?: ImageCardItem[]; baseHref?: string }>(), {
  items: () => [],
  baseHref: '',
})
</script>

<template>
  <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
    <ImageCard v-for="item in props.items" :key="item.id" v-bind="item" :baseHref="baseHref" />
  </div>
</template>
