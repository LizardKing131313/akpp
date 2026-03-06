<script setup lang="ts">
import { cn } from '#shared/lib/cn'

import { useSelectCityModal } from '~/composables/modal/useSelectCityModal'

interface TopBarProps {
  iconSource: string
  iconAlt?: string
  iconClass?: string
  city: string
  searchIconSource: string
  searchIconClass?: string
  searchPlaceholder?: string
}

withDefaults(defineProps<TopBarProps>(), {
  iconSource: '',
  iconAlt: '',
  iconClass: '',
  city: '',
  searchIconSource: '',
  searchIconClass: '',
  searchPlaceholder: '',
})

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
        aria-label="Выбрать город"
        @click="handleClick">
        <NuxtImg
          :src="iconSource"
          :alt="iconAlt"
          width="24"
          height="24"
          :class="['h-6 w-6 shrink-0 object-contain', iconClass]" />

        <span class="text-brand-white text-sm underline-offset-4 hover:underline">
          {{ city }}
        </span>
      </button>

      <div class="relative hidden w-64 md:block">
        <NuxtImg
          :src="searchIconSource"
          alt=""
          aria-hidden="true"
          width="16px"
          height="16px"
          :class="[
            'pointer-events-none absolute top-1/2 left-3 ' +
              'text-brand-grey-light h-4 w-4 -translate-y-1/2',
            searchIconClass,
          ]" />
        <input
          type="text"
          :placeholder="searchPlaceholder"
          aria-label="Поиск по сайту"
          :class="
            cn(`
              bg-brand-grey text-brand-white placeholder-brand-grey-light
              w-full rounded-full py-1 pr-4 pl-10 text-sm outline-none
            `)
          " />
      </div>
    </div>
  </div>
</template>
