<script setup lang="ts">
import type { ServicePriceItem } from '#shared/types/components/service'

defineProps<{ servicePrice: ServicePriceItem }>()
</script>

<template>
  <div class="grid grid-cols-[1fr_auto] items-start gap-x-6 py-5">
    <p class="text-brand-dark min-w-0 text-base leading-snug sm:text-lg">
      {{ servicePrice.title }}
    </p>

    <div
      :class="[
        'text-right text-base font-semibold whitespace-nowrap uppercase sm:text-lg',
        servicePrice.price.isFree() ? 'text-brand-red' : 'text-brand-dark',
      ]">
      <span
        v-if="servicePrice.price.isFrom() && !servicePrice.price.isFree()"
        class="text-brand-grey-light mr-1 text-sm lowercase">
        {{ servicePrice.price.priceFromText }}
      </span>

      {{
        servicePrice.price.isFree()
          ? servicePrice.price.priceFreeText
          : servicePrice.price.getMoney()
      }}

      <span v-if="!servicePrice.price.isFree()" class="ml-1 lowercase">
        {{ servicePrice.price.currency }}
      </span>
    </div>
  </div>
</template>
