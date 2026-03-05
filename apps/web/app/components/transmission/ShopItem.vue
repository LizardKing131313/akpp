<script setup lang="ts">
import { getMoney } from '#shared/lib/money'
import { computed } from 'vue'

import { useShopModal } from '~/composables/modal/useShopModal'

const props = withDefaults(
  defineProps<{ buyButtonLabel?: string; transmissionItem: TransmissionItem }>(),
  {
    buyButtonLabel: 'Купить',
  }
)

const { openShopModal } = useShopModal()
const handleClick = (): void => {
  openShopModal('shop')
}

const price = computed<string>(() => {
  return getMoney(props.transmissionItem.price)
})
</script>

<template>
  <div
    class="bg-brand-white flex h-full w-full flex-col text-center shadow-[0_20px_30px_0_#2222220f]">
    <div
      class="mx-auto mb-6 flex h-37.5 w-37.5 items-center justify-center sm:mb-8 sm:h-50 sm:w-50">
      <NuxtImg
        :src="transmissionItem.image_source"
        :alt="transmissionItem.image_alt"
        sizes="(max-width: 640px) 150px, 200px"
        class="h-full w-full object-contain" />
    </div>

    <h3 class="text-brand-dark mb-4 text-2xl font-bold">
      {{ transmissionItem.name }}
    </h3>

    <div class="flex flex-1 flex-col">
      <p class="text-brand-grey-light mb-4 text-sm leading-relaxed">
        {{ transmissionItem.description }}
      </p>

      <div class="bg-brand-soft/70 mt-auto h-px w-full"></div>
    </div>

    <div class="mt-4 flex flex-col items-center">
      <div
        class="bg-brand-red text-brand-white mx-auto mb-2 inline-block rounded-full px-8 py-1 text-[16px] font-bold">
        {{ price }}
      </div>

      <MainButton reverse class="py-2" @click="handleClick">{{ buyButtonLabel }}</MainButton>
    </div>
  </div>
</template>
