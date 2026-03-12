<script setup lang="ts">
import type { CityItem } from '#shared/types/city'
import type { YandexMapPoint } from '#shared/types/entity'
import type { LocationItem } from '#shared/types/location'

import { PAGE_LABELS } from '#shared/constants/page-labels'

import { useSimplePagePresentation } from '~/composables/useSimplePagePresentation'

const { data: citiesData } = await useCities()

const cities = computed<CityItem[]>(() => citiesData.value ?? [])

const selectedCityId = ref<string>('')
const selectedLocationId = ref<string | null>(null)

const { data: filteredLocationsData } = await useLocations(selectedCityId)

watch(
  () => cities.value,
  (cityList) => {
    if (selectedCityId.value.length > 0) {
      return
    }

    const defaultCity = cityList.find((cityItem) => cityItem.is_default)
    selectedCityId.value = defaultCity?.id ?? cityList[0]?.id ?? ''
  },
  { immediate: true }
)

const filteredLocations = computed<LocationItem[]>(() => {
  return filteredLocationsData.value ?? []
})

const selectedLocation = computed<LocationItem | null>(() => {
  if (!selectedLocationId.value) return null
  return (
    filteredLocations.value.find((locationItem) => locationItem.id === selectedLocationId.value) ??
    null
  )
})

watch(
  () => selectedCityId.value,
  () => {
    selectedLocationId.value = null
  }
)

const mapPoints = computed<YandexMapPoint[]>(() => {
  if (selectedLocation.value) {
    return [
      {
        id: selectedLocation.value.id,
        title: selectedLocation.value.name ?? selectedLocation.value.address,
        lng: selectedLocation.value.lng,
        lat: selectedLocation.value.lat,
      },
    ]
  }

  return filteredLocations.value.map((locationItem) => ({
    id: locationItem.id,
    title: locationItem.name ?? locationItem.address,
    lng: locationItem.lng,
    lat: locationItem.lat,
  }))
})

const mapCenter = computed<[number, number]>(() => {
  if (selectedLocation.value) {
    return [selectedLocation.value.lng, selectedLocation.value.lat]
  }

  const firstLocation = filteredLocations.value[0]
  if (firstLocation) return [firstLocation.lng, firstLocation.lat]
  return [37.618423, 55.751244]
})

const mapZoom = computed<number>(() => {
  if (selectedLocation.value) return 14

  const countLocations = filteredLocations.value.length
  if (countLocations <= 1) return 12
  return 10
})

const openLocation = (location: LocationItem): void => {
  selectedLocationId.value = location.id
}

const goBack = (): void => {
  selectedLocationId.value = null
}

const pageTitle = computed<string>(() => PAGE_LABELS.contacts)

useSimplePagePresentation({
  title: pageTitle,
  description: pageTitle,
  baseItems: computed(() => [{ name: 'Главная', slug: '/' }]),
})

definePageMeta({
  footer: {
    hideContacts: true,
  },
})
</script>

<template>
  <TwoColumns class="lg:grid-cols-[0.7fr_1.3fr]">
    <div class="hidden lg:flex lg:h-200 lg:flex-col">
      <template v-if="!selectedLocation">
        <label class="block">
          <span class="text-brand-grey-light mb-2 block text-sm">Город</span>

          <select
            v-model="selectedCityId"
            class="bg-brand-white text-brand-dark w-full cursor-pointer py-4 text-base font-bold focus:ring-0 focus:outline-none">
            <option v-for="cityItem in cities" :key="cityItem.id" :value="cityItem.id">
              {{ cityItem.name }}
            </option>
          </select>
        </label>

        <div class="mt-4 flex-1 overflow-y-auto">
          <div class="space-y-8 pl-1">
            <ContactLocationCard
              v-for="location in filteredLocations"
              :key="location.id"
              :location="location"
              @open="openLocation" />
          </div>
        </div>
      </template>

      <template v-else>
        <div class="mt-1 flex-1 overflow-y-auto pl-1">
          <ContactLocationCardDetail :location="selectedLocation" :on-back="goBack" />
        </div>
      </template>
    </div>

    <ClientOnly>
      <div class="lg:hidden">
        <YandexMap :locations="mapPoints" :center="mapCenter" :zoom="mapZoom" :height-px="400" />
      </div>

      <div class="hidden lg:block">
        <YandexMap :locations="mapPoints" :center="mapCenter" :zoom="mapZoom" :height-px="800" />
      </div>
    </ClientOnly>
  </TwoColumns>
</template>
