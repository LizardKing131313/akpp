<script setup lang="ts">
import type { YMapLocationRequest } from '@yandex/ymaps3-types'

import { cn } from '#shared/lib/cn'
import { shallowRef } from 'vue'
import { loadYandexMapComponents, type YandexMapComponents } from '~~/shared/lib/ymaps'

type LocationPoint = {
  id: string
  title: string
  lng: number
  lat: number
}

const runtimeConfig = useRuntimeConfig()

const locations: LocationPoint[] = [
  { id: '1', title: 'Точка 1', lng: 37.588144, lat: 55.733842 },
  { id: '2', title: 'Точка 2', lng: 37.620393, lat: 55.75396 },
  { id: '3', title: 'Точка 3', lng: 37.5402, lat: 55.7174 },
]

const location: YMapLocationRequest = {
  center: [37.618423, 55.751244],
  zoom: 10,
}

const components = shallowRef<YandexMapComponents | null>(null)
const loadError = shallowRef<string | null>(null)

const markerElements = shallowRef<Record<string, HTMLElement>>({})

const MARKER_SOURCE_ID = 'marker-source'

const createMarkerElement = (title: string): HTMLElement => {
  const wrapper = document.createElement('div')
  wrapper.style.width = '32px'
  wrapper.style.height = '32px'
  wrapper.style.transform = 'translate(-50%, -100%)'
  wrapper.style.pointerEvents = 'none'

  const image = document.createElement('img')
  image.src = '/images/icons/location.svg'
  image.alt = title
  image.draggable = false
  image.style.width = '32px'
  image.style.height = '32px'
  image.style.display = 'block'

  wrapper.appendChild(image)
  return wrapper
}

onMounted(async () => {
  try {
    const apiKey = runtimeConfig.public.yandexMapApiKey
    if (!apiKey) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error('Missing runtimeConfig.public.yandexMapApiKey')
    }

    components.value = await loadYandexMapComponents({ apiKey, lang: 'ru_RU' })

    const createdElements: Record<string, HTMLElement> = {}
    for (const point of locations) {
      createdElements[point.id] = createMarkerElement(point.title)
    }
    markerElements.value = createdElements
  } catch (caughtError: unknown) {
    loadError.value = caughtError instanceof Error ? caughtError.message : 'Unknown error'
  }
})
</script>

<template>
  <div class="h-75 w-full">
    <div
      v-if="loadError"
      :class="
        cn(`
          grid h-full w-full place-items-center rounded-lg
          bg-neutral-100 p-4 text-sm text-neutral-700
        `)
      ">
      {{ loadError }}
    </div>

    <div v-else-if="!components" class="h-full w-full animate-pulse rounded-lg bg-neutral-200" />

    <component v-else :is="components.YMap" :location="location" class="h-full w-full">
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
