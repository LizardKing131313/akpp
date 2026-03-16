<script setup lang="ts">
import type { YandexMapPoint } from '#shared/types/entity'
import type {
  YMapDefaultFeaturesLayer as YMapDefaultFeaturesLayerInstance,
  YMapDefaultSchemeLayer as YMapDefaultSchemeLayerInstance,
  YMap as YMapInstance,
  YMapLocationRequest,
  YMapMarker as YMapMarkerInstance,
} from '@yandex/ymaps3-types'

import { computed, shallowRef, watch } from 'vue'

import { loadYandexMapsApi } from '~/composables/ymaps'

interface YandexMapProps {
  locations: YandexMapPoint[]
  center: [number, number]
  zoom: number
  heightPx?: number
}

const props = defineProps<YandexMapProps>()

const runtimeConfig = useRuntimeConfig()

const location = computed<YMapLocationRequest>(() => {
  return {
    center: props.center,
    zoom: props.zoom,
  }
})

const loadError = shallowRef<string | null>(null)
const isMapReady = shallowRef(false)
const selectedPointId = shallowRef<string | null>(null)
const mapRootElement = shallowRef<HTMLElement | null>(null)
const mapContainerElement = shallowRef<HTMLElement | null>(null)
let tileImageObserver: MutationObserver | null = null

let mapInstance: YMapInstance | null = null
let schemeLayer: YMapDefaultSchemeLayerInstance | null = null
let featuresLayer: YMapDefaultFeaturesLayerInstance | null = null
let markerInstances: YMapMarkerInstance[] = []

const selectedPoint = computed<YandexMapPoint | null>(() => {
  if (!selectedPointId.value) {
    return null
  }

  return props.locations.find((point) => point.id === selectedPointId.value) ?? null
})

const createMarkerElement = (point: YandexMapPoint): HTMLElement => {
  const wrapperElement = document.createElement('button')
  wrapperElement.type = 'button'
  wrapperElement.style.width = '32px'
  wrapperElement.style.height = '32px'
  wrapperElement.style.transform = 'translate(-50%, -100%)'
  wrapperElement.style.pointerEvents = 'auto'
  wrapperElement.style.background = 'transparent'
  wrapperElement.style.border = '0'
  wrapperElement.style.padding = '0'
  wrapperElement.style.cursor = 'pointer'
  wrapperElement.setAttribute('aria-label', point.name)
  wrapperElement.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()
    selectedPointId.value = point.id
  })

  const imageElement = document.createElement('img')
  imageElement.src = '/images/icons/location.svg'
  imageElement.alt = point.name
  imageElement.draggable = false
  imageElement.style.width = '32px'
  imageElement.style.height = '32px'
  imageElement.style.display = 'block'

  wrapperElement.appendChild(imageElement)
  return wrapperElement
}

const syncMarkers = (): void => {
  if (!mapInstance) return

  for (const markerInstance of markerInstances) {
    mapInstance.removeChild(markerInstance)
  }

  markerInstances = []

  for (const point of props.locations) {
    const markerInstance = new ymaps3.YMapMarker(
      { coordinates: [point.lng, point.lat] },
      createMarkerElement(point)
    )

    mapInstance.addChild(markerInstance)
    markerInstances.push(markerInstance)
  }
}

const syncLocation = (): void => {
  if (!mapInstance) return
  mapInstance.setLocation(location.value)
}

const patchTileImageAccessibility = (): void => {
  const rootElement = mapRootElement.value
  if (!rootElement) return

  for (const imageElement of rootElement.querySelectorAll('img')) {
    if (imageElement.closest('button')) continue

    imageElement.alt = 'Локация'
    imageElement.setAttribute('aria-hidden', 'true')
  }

  for (const linkElement of rootElement.querySelectorAll('a')) {
    const className = linkElement.className
    if (!className.includes('map-copyrights__logo')) continue

    linkElement.setAttribute('aria-label', 'Яндекс Карты')
    linkElement.setAttribute('title', 'Яндекс Карты')
  }
}

onMounted(async () => {
  try {
    const apiKey = runtimeConfig.public.yandexMapApiKey
    if (!apiKey) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error('Missing runtimeConfig.public.yandexMapApiKey')
    }

    await loadYandexMapsApi({ apiKey, lang: 'ru_RU' })

    if (!mapContainerElement.value) {
      throw new Error('Missing map container element')
    }

    mapInstance = new ymaps3.YMap(mapContainerElement.value, {
      location: location.value,
    })
    schemeLayer = new ymaps3.YMapDefaultSchemeLayer({})
    featuresLayer = new ymaps3.YMapDefaultFeaturesLayer({})

    mapInstance.addChild(schemeLayer).addChild(featuresLayer)
    syncMarkers()
    isMapReady.value = true
  } catch (caughtError: unknown) {
    loadError.value = caughtError instanceof Error ? caughtError.message : 'Unknown error'
  }

  patchTileImageAccessibility()

  if (mapRootElement.value) {
    tileImageObserver = new MutationObserver(() => {
      patchTileImageAccessibility()
    })

    tileImageObserver.observe(mapRootElement.value, {
      childList: true,
      subtree: true,
    })
  }
})

onBeforeUnmount(() => {
  tileImageObserver?.disconnect()
  tileImageObserver = null

  isMapReady.value = false
  markerInstances = []
  featuresLayer = null
  schemeLayer = null
  mapInstance?.destroy()
  mapInstance = null
})

watch(
  () => props.locations,
  () => {
    if (!import.meta.client) return
    syncMarkers()

    if (
      selectedPointId.value !== null &&
      !props.locations.some((point) => point.id === selectedPointId.value)
    ) {
      selectedPointId.value = null
    }
  },
  { deep: true }
)

watch(location, () => {
  if (!import.meta.client) return
  syncLocation()
})
</script>

<template>
  <div ref="mapRootElement" class="relative w-full" :style="{ height: heightPx + 'px' }">
    <div v-if="loadError" class="grid h-full place-items-center rounded-xl p-4">
      {{ loadError }}
    </div>

    <div v-else ref="mapContainerElement" class="h-full w-full rounded-xl" />
    <div
      v-if="!loadError && !isMapReady"
      class="absolute inset-0 h-full w-full animate-pulse rounded-xl" />

    <div
      v-if="selectedPoint"
      class="bg-brand-white absolute right-4 bottom-4 z-20 max-w-80 rounded-2xl px-4 py-3 shadow-[0_18px_40px_rgba(43,42,41,0.18)]">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="text-brand-dark text-sm font-bold">{{ selectedPoint.name }}</p>
          <p v-if="selectedPoint.address" class="text-brand-grey mt-1 text-sm">
            {{ selectedPoint.address }}
          </p>
        </div>

        <button
          type="button"
          class="text-brand-grey-light hover:text-brand-red shrink-0 text-sm transition-colors"
          aria-label="Закрыть"
          @click="selectedPointId = null">
          ×
        </button>
      </div>
    </div>
  </div>
</template>
