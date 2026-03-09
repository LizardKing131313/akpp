<script setup lang="ts">
import { cn } from '#shared/lib/cn'

import { useSignupModal } from '~/composables/modal/useSignupModal'
import { useFooterUiSettings } from '~/composables/useFooterUiSettings'

defineProps<{
  pulse?: boolean
}>()

const settings = useFooterUiSettings()

const handleClick = (): void => {
  useSignupModal().openModal()
}
</script>

<template>
  <button
    :class="
      cn(`
        bg-brand-red fixed right-6 bottom-6 z-50 hidden h-18.25 w-18.25 items-center
        justify-center rounded-full shadow-xl transition-transform
        duration-200 hover:scale-105 active:scale-95 lg:flex
      `)
    "
    :aria-label="settings.contact_button_aria_label"
    @click="handleClick">
    <span
      v-if="pulse"
      class="bg-brand-red absolute inset-0 animate-ping rounded-full opacity-40"></span>
    <span
      v-if="pulse"
      class="bg-brand-red absolute inset-0 scale-110 animate-ping rounded-full opacity-20"></span>

    <CmsImage
      :src="settings.contact_button_icon_source"
      :alt="settings.contact_button_icon_alt"
      width="28"
      height="28"
      class="relative h-7 w-7 shrink-0"
      loading="eager" />
  </button>
</template>
