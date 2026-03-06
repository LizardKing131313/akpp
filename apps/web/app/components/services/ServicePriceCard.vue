<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { getMoneyView } from '#shared/lib/money'
import { computed } from 'vue'

const props = defineProps<{ servicePrice: ServicePriceItem }>()

const moneyView = computed(() => {
  return getMoneyView(props.servicePrice.price, props.servicePrice.isFrom)
})

const priceClassName = computed(() => {
  return cn(
    'text-right text-base font-semibold whitespace-nowrap uppercase sm:text-lg',
    moneyView.value.isFree ? 'text-brand-red' : 'text-brand-dark'
  )
})
</script>

<template>
  <div class="grid grid-cols-[1fr_auto] items-start gap-x-4 py-4">
    <p class="text-brand-dark min-w-0 text-base leading-snug sm:text-lg">
      {{ servicePrice.name }}
    </p>

    <div :class="priceClassName">
      <span
        v-if="moneyView.isFrom && !moneyView.isFree"
        class="text-brand-grey-light mr-1 text-sm lowercase">
        {{ moneyView.fromText }}
      </span>

      {{ moneyView.amountText }}

      <span v-if="!moneyView.isFree" class="ml-1 lowercase">
        {{ moneyView.currencyText }}
      </span>
    </div>
  </div>
</template>
