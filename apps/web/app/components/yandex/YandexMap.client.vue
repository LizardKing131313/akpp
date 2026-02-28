<script setup lang="ts">
import type { MapPoint } from '#shared/types/components/map'
import type { YMapLocationRequest } from '@yandex/ymaps3-types'

import { computed, shallowRef, watch } from 'vue'
import { loadYandexMapComponents, type YandexMapComponents } from '~~/shared/lib/ymaps'

interface YandexMapProps {
  locations: MapPoint[]
  center: [number, number]
  zoom: number
  heightPx: number
}

const props = defineProps<YandexMapProps>()

const runtimeConfig = useRuntimeConfig()

const location = computed<YMapLocationRequest>(() => {
  return {
    center: props.center,
    zoom: props.zoom,
  }
})

const components = shallowRef<YandexMapComponents | null>(null)
const loadError = shallowRef<string | null>(null)

const markerElements = shallowRef<Record<string, HTMLElement>>({})

const MARKER_SOURCE_ID = 'marker-source'

const createMarkerElement = (title: string): HTMLElement => {
  const wrapperElement = document.createElement('div')
  wrapperElement.style.width = '32px'
  wrapperElement.style.height = '32px'
  wrapperElement.style.transform = 'translate(-50%, -100%)'
  wrapperElement.style.pointerEvents = 'none'

  const imageElement = document.createElement('img')
  imageElement.src = '/images/icons/location.svg'
  imageElement.alt = title
  imageElement.draggable = false
  imageElement.style.width = '32px'
  imageElement.style.height = '32px'
  imageElement.style.display = 'block'

  wrapperElement.appendChild(imageElement)
  return wrapperElement
}

const rebuildMarkers = (): void => {
  const createdElements: Record<string, HTMLElement> = {}
  for (const point of props.locations) {
    createdElements[point.id] = createMarkerElement(point.title)
  }
  markerElements.value = createdElements
}

onMounted(async () => {
  try {
    const apiKey = runtimeConfig.public.yandexMapApiKey
    if (!apiKey) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error('Missing runtimeConfig.public.yandexMapApiKey')
    }

    components.value = await loadYandexMapComponents({ apiKey, lang: 'ru_RU' })
    rebuildMarkers()
  } catch (caughtError: unknown) {
    loadError.value = caughtError instanceof Error ? caughtError.message : 'Unknown error'
  }
})

watch(
  () => props.locations,
  () => {
    if (!import.meta.client) return
    rebuildMarkers()
  },
  { deep: true }
)
</script>

<template>
  <div class="w-full" :style="{ height: heightPx + 'px' }">
    <div v-if="loadError" class="grid h-full place-items-center rounded-xl p-4">
      {{ loadError }}
    </div>

    <div v-else-if="!components" class="h-full w-full animate-pulse rounded-xl" />

    <component v-else :is="components.YMap" :location="location">
      <component :is="components.YMapDefaultSchemeLayer" />
      <component :is="components.YMapDefaultFeaturesLayer" />
      <component :is="components.YMapFeatureDataSource" :id="MARKER_SOURCE_ID" />
      <component :is="components.YMapLayer" :source="MARKER_SOURCE_ID" type="markers" />

      <component
        v-for="point in locations"
        :key="point.id"
        :is="components.YMapMarker"
        :source="MARKER_SOURCE_ID"
        :coordinates="[point.lng, point.lat]"
        :markerElement="markerElements[point.id]" />
    </component>
  </div>
</template>
