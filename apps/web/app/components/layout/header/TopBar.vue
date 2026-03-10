<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { computed, ref, watch } from 'vue'

import { useSelectCityModal } from '~/composables/modal/useSelectCityModal'
import { useActiveCity } from '~/composables/useActiveCity'
import { useHeaderUiSettings } from '~/composables/useHeaderUiSettings'

const activeCity = useActiveCity()

const activeCityName = computed<string>(() => {
  const cityNameFromSubdomain = activeCity.value?.name?.trim() ?? ''
  if (cityNameFromSubdomain.length > 0) {
    return cityNameFromSubdomain
  }

  return ''
})

const settings = useHeaderUiSettings()
const route = useRoute()
const router = useRouter()

const normalizeSearchQuery = (rawValue: unknown): string => {
  if (typeof rawValue === 'string') {
    return rawValue.trim()
  }

  if (Array.isArray(rawValue)) {
    const firstValue = rawValue[0]
    return typeof firstValue === 'string' ? firstValue.trim() : ''
  }

  return ''
}

const searchValue = ref<string>(normalizeSearchQuery(route.query.q))
const debouncedSearchValue = useDebouncedRef(searchValue, { delayMs: 400 })

watch(
  () => route.query.q,
  (nextQueryValue) => {
    const normalizedQueryValue = normalizeSearchQuery(nextQueryValue)
    if (normalizedQueryValue !== searchValue.value) {
      searchValue.value = normalizedQueryValue
    }
  }
)

watch(
  () => debouncedSearchValue.value,
  (nextSearchValue) => {
    const normalizedSearchValue = nextSearchValue.trim()
    const currentQueryValue = normalizeSearchQuery(route.query.q)

    if (normalizedSearchValue === currentQueryValue) {
      return
    }

    const nextQuery = { ...route.query }

    if (normalizedSearchValue.length > 0) {
      nextQuery.q = normalizedSearchValue
    } else {
      delete nextQuery.q
    }

    void router.replace({ query: nextQuery })
  }
)

const handleClick = (): void => {
  useSelectCityModal().openModal()
}
</script>

<template>
  <div class="bg-brand-dark text-brand-white">
    <div
      :class="
        cn(`
          mx-auto flex max-w-6xl items-center justify-center
          px-4 py-2 text-sm md:justify-between
        `)
      ">
      <button
        class="group hover:text-brand-red flex items-center gap-2 transition-colors duration-200"
        type="button"
        :aria-label="settings.location_button_aria_label"
        @click="handleClick">
        <CmsImage
          :src="settings.location_icon_source"
          :alt="settings.location_icon_alt"
          width="24"
          height="24"
          class="h-6 w-6 shrink-0 object-contain" />

        <span class="text-brand-white text-sm underline-offset-4 hover:underline">
          {{ activeCityName }}
        </span>
      </button>

      <div class="relative hidden w-64 md:block">
        <CmsImage
          :src="settings.search_icon_source"
          alt=""
          aria-hidden="true"
          width="16px"
          height="16px"
          class="text-brand-grey-light pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <input
          v-model="searchValue"
          type="search"
          :placeholder="settings.search_placeholder"
          :aria-label="settings.search_input_aria_label"
          :class="
            cn(`
              bg-brand-grey text-brand-white placeholder-brand-grey-light
              w-full rounded-full py-1 pr-4 pl-10 text-sm outline-none
            `)
          "
          autocomplete="off" />
      </div>
    </div>
  </div>
</template>
