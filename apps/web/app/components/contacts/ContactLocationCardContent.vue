<script setup lang="ts">
import type { ContactLocation } from '#shared/types/components/location'

import { useSignupModal } from '#shared/lib/modal/useSignupModal'

const props = defineProps<{
  location: ContactLocation
  detail?: boolean
  onBack?: () => void
}>()

const { openSignupModal } = useSignupModal()

const handleSignupClick = (): void => {
  openSignupModal('contacts')
}
</script>

<template>
  <button
    v-if="detail && props.onBack"
    type="button"
    class="text-brand-grey hover:text-brand-red mb-4 flex cursor-pointer items-center justify-center text-sm"
    @click="props.onBack?.()">
    <Arrow direction="left" /> Назад
  </button>

  <div class="text-brand-dark text-left font-bold group-hover:underline">
    {{ location.title }}
  </div>

  <div class="text-brand-grey mt-2 text-left text-sm leading-5">
    {{ location.address }}
  </div>

  <div v-if="location.metro" class="mt-3 flex items-center gap-2 text-left">
    <span
      class="h-2.5 w-2.5 rounded-full text-left"
      :style="{ backgroundColor: location.metro.lineColorHex }" />
    <span class="text-brand-grey text-left text-sm">м. {{ location.metro.title }}</span>
  </div>

  <div class="text-brand-grey mt-2 text-left text-sm">
    {{ location.worktime }}
  </div>

  <div v-if="detail" class="text-brand-grey mt-2 text-left text-sm">
    Тел:
    <a
      :href="'tel:' + location.phone"
      class="text-brand-dark hover:text-brand-red ml-1 text-left text-lg font-bold underline-offset-4 transition-colors duration-200 hover:underline">
      {{ location.phone }}
    </a>
  </div>

  <MainButton
    v-if="detail"
    class="mt-6 flex w-auto items-center justify-center px-14"
    @click="handleSignupClick">
    Записаться на ремонт
  </MainButton>

  <div v-if="detail" class="mt-6 grid grid-cols-2 gap-4">
    <NuxtImg
      v-for="imageItem in location.images"
      :key="imageItem.source"
      :src="imageItem.source"
      :alt="imageItem.alt"
      class="h-40 w-full rounded-xl object-cover" />
  </div>
</template>
