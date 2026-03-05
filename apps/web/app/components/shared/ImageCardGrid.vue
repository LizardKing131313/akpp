<script setup lang="ts">
import type { ImageCardItem } from '#shared/types/entity'
import type { Component } from 'vue'

interface CardGridProps {
  items: ImageCardItem[]
  cardComponent?: Component
}

const props = defineProps<CardGridProps>()
</script>

<template>
  <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
    <ImageCard v-for="item in props.items" :key="item.id" v-bind="item" />
  </div>
</template>
