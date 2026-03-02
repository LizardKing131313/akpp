<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { computed, ref } from 'vue'

import ModalClose from '~/components/modal/components/ModalClose.vue'
import ModalWindow from '~/components/modal/components/ModalWindow.vue'

type CityItem = {
  id: string
  title: string
}

const props = withDefaults(
  defineProps<{
    cities?: CityItem[]
    selectedCityId?: string
    title?: string
    searchPlaceholder?: string
    emptyText?: string
  }>(),
  {
    title: 'Выбрать город',
    searchPlaceholder: 'Поиск по городу',
    emptyText: 'Ничего не найдено',
    cities: () => [
      { id: 'msk', title: 'Москва' },
      { id: 'sbp', title: 'Питер' },
    ],
    selectedCityId: 'msk',
  }
)

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'select', cityId: string): void
}>()

const searchValue = ref<string>('')

const normalizedSearch = computed<string>(() => {
  return searchValue.value.trim().toLowerCase()
})

const filteredCities = computed<readonly CityItem[]>(() => {
  const query = normalizedSearch.value
  if (!query) return props.cities

  return props.cities.filter((cityItem) => {
    return cityItem.title.toLowerCase().includes(query)
  })
})

const emitClose = (): void => {
  emit('close')
}

const handleSelect = (cityId: string): void => {
  emit('select', cityId)
  emitClose()
}
</script>

<template>
  <ModalWindow>
    <ModalClose @click="emitClose" />

    <div
      class="max-h-[85svh] overflow-y-auto px-5 pt-7 pb-6 sm:max-h-none sm:px-8 sm:pt-10 sm:pb-8">
      <div class="pr-10">
        <div class="text-brand-dark text-2xl font-extrabold tracking-wide uppercase sm:text-4xl">
          {{ props.title }}
        </div>
      </div>

      <div class="mt-6">
        <input
          v-model="searchValue"
          type="text"
          :placeholder="props.searchPlaceholder"
          class="bg-brand-white text-brand-dark placeholder:text-brand-grey-light focus:border-brand-red focus:ring-brand-red/25 h-12 w-full rounded-xl px-4 text-base outline-none focus:ring-2"
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
                    'text-brand-dark hover:text-brand-red flex w-full items-start gap-3 text-left text-lg leading-6 transition-colors',
                    city.id === props.selectedCityId ? 'text-brand-red font-semibold' : ''
                  )
                "
                @click="handleSelect(city.id)">
                <span
                  class="text-brand-dark mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                <span class="min-w-0 wrap-break-word">
                  {{ city.title }}
                </span>
              </button>
            </li>
          </ul>

          <div v-else class="text-brand-grey py-6 text-sm">
            {{ props.emptyText }}
          </div>
        </div>
      </div>
    </div>
  </ModalWindow>
</template>
