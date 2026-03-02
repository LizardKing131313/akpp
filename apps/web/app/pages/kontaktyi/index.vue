<script setup lang="ts">
import type { CityItem } from '#shared/types/components/city'
import type { ContactLocation } from '#shared/types/components/location'
import type { MapPoint } from '#shared/types/components/map'

import { getCities } from '#server/api/city/city.get'
import { getLocations } from '#server/api/contacts/contacts.get'
import { BreadcrumbItem } from '#shared/types/layout/breadcrumb'
import { computed, ref, watch } from 'vue'

definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    title: 'Контакты',
    backgroundSrc: '/images/breadcrumbs.jpg',
    items: [
      new BreadcrumbItem({ label: 'Главная', to: '/' }),
      new BreadcrumbItem({ label: 'Контакты', to: '/kontaktyi' }),
    ],
  },
  footer: {
    hideContacts: true,
  },
})

const cities: CityItem[] = getCities()

const allLocations: ContactLocation[] = getLocations()

const selectedCityId = ref<string>(cities[0]?.id ?? '')
const selectedLocationId = ref<string | null>(null)

const filteredLocations = computed<ContactLocation[]>(() => {
  return allLocations.filter((locationItem) => locationItem.cityId === selectedCityId.value)
})

const selectedLocation = computed<ContactLocation | null>(() => {
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

const mapPoints = computed<MapPoint[]>(() => {
  if (selectedLocation.value) {
    return [
      {
        id: selectedLocation.value.id,
        title: selectedLocation.value.title,
        lng: selectedLocation.value.lng,
        lat: selectedLocation.value.lat,
      },
    ]
  }

  return filteredLocations.value.map((locationItem) => ({
    id: locationItem.id,
    title: locationItem.title,
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

const openLocation = (location: ContactLocation): void => {
  selectedLocationId.value = location.id
}

const goBack = (): void => {
  selectedLocationId.value = null
}
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
              {{ cityItem.title }}
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
