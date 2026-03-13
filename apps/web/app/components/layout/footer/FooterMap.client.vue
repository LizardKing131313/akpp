<script setup lang="ts">
import type { YandexMapPoint } from '#shared/types/entity'

import YandexMap from '~/components/yandex/YandexMap.client.vue'

defineProps<{
  locations: YandexMapPoint[]
  center: [number, number]
  zoom: number
  heightPx?: number
}>()
</script>

<template>
  <YandexMap :locations="locations" :center="center" :zoom="zoom" :height-px="heightPx ?? 300" />
</template>
