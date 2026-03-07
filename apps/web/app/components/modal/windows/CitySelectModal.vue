<script setup lang="ts">
import type { CityItem } from '#shared/types/city'

import { cn } from '#shared/lib/cn'
import { computed, ref } from 'vue'

import { useActiveCity } from '~/composables/useActiveCity'
import { useCities } from '~/composables/useRepoApi'

const emit = defineEmits<{
  (event: 'close'): void
}>()

const title = 'Выбрать город'
const searchPlaceholder = 'Поиск по городу'
const emptyText = 'Ничего не найдено'

const { data: citiesData } = useCities()
const activeCity = useActiveCity()

const cities = computed<readonly CityItem[]>(() => citiesData.value ?? [])
const selectedCityId = computed<string>(() => activeCity.value?.id ?? '')

const searchValue = ref<string>('')
const debouncedSearchValue = useDebouncedRef(searchValue, { delayMs: 300 })

const normalizedSearch = computed<string>(() => debouncedSearchValue.value.trim().toLowerCase())

const filteredCities = computed<readonly CityItem[]>(() => {
  const queryValue = normalizedSearch.value
  if (queryValue.length === 0) {
    return cities.value
  }

  return cities.value.filter((cityItem) => cityItem.name.toLowerCase().includes(queryValue))
})

const emitClose = (): void => {
  emit('close')
}

const resolveBaseDomain = (hostname: string): string => {
  const hostParts = hostname.split('.').filter((part) => part.length > 0)

  if (hostname === 'localhost') {
    return 'localhost'
  }

  if (hostParts.length >= 3 && hostParts[0] !== 'www') {
    return hostParts.slice(1).join('.')
  }

  if (hostParts.length >= 3 && hostParts[0] === 'www') {
    return hostParts.slice(1).join('.')
  }

  return hostname
}

const buildCityUrl = (citySlug: string, currentUrl: URL): URL => {
  const targetUrl = new URL(currentUrl.toString())
  const baseDomain = resolveBaseDomain(currentUrl.hostname)
  targetUrl.hostname = `${citySlug}.${baseDomain}`
  return targetUrl
}

const handleSelect = (cityId: string): void => {
  const selectedCity = cities.value.find((cityItem) => cityItem.id === cityId)
  if (!selectedCity) {
    emitClose()
    return
  }

  if (!import.meta.client) {
    emitClose()
    return
  }

  const currentUrl = new URL(window.location.href)
  const targetUrl = buildCityUrl(selectedCity.slug, currentUrl)

  if (targetUrl.toString() === currentUrl.toString()) {
    emitClose()
    return
  }

  window.location.assign(targetUrl.toString())
}
</script>

<template>
  <ModalWindow>
    <ModalClose @click="emitClose" />

    <div
      class="max-h-[85svh] overflow-y-auto px-5 pt-7 pb-6 sm:max-h-none sm:px-8 sm:pt-10 sm:pb-8">
      <div class="pr-10">
        <div class="text-brand-dark text-2xl font-extrabold tracking-wide uppercase sm:text-4xl">
          {{ title }}
        </div>
      </div>

      <div class="mt-6">
        <input
          v-model="searchValue"
          type="text"
          :placeholder="searchPlaceholder"
          :class="
            cn(`
              bg-brand-white text-brand-dark placeholder:text-brand-grey-light
              focus:border-brand-red focus:ring-brand-red/25 h-12 w-full rounded-xl
              px-4 text-base outline-none focus:ring-2
            `)
          "
          autocomplete="off" />
      </div>

      <div class="mt-2">
        <div class="max-h-[45svh] overflow-y-auto px-4 py-4 sm:max-h-[55svh]">
          <ul v-if="filteredCities.length > 0" class="space-y-3">
            <li v-for="city in filteredCities" :key="city.id">
              <button
                type="button"
                :class="
                  cn(
                    `text-brand-dark hover:text-brand-red flex w-full
                    items-start gap-3 text-left text-lg leading-6 transition-colors`,
                    city.id === selectedCityId ? 'text-brand-red font-semibold' : ''
                  )
                "
                @click="handleSelect(city.id)">
                <span
                  class="text-brand-dark mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                <span class="min-w-0 wrap-break-word">
                  {{ city.name }}
                </span>
              </button>
            </li>
          </ul>

          <div v-else class="text-brand-grey py-6 text-sm">
            {{ emptyText }}
          </div>
        </div>
      </div>
    </div>
  </ModalWindow>
</template>
