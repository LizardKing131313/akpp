<script setup lang="ts">
import type { CaseItem, CaseSettings } from '#shared/types/case'

import { getMoneyView } from '#shared/lib/money'
import { computed } from 'vue'

import { useRepairQuizModal } from '~/composables/modal/useRepairQuizModal'
import { useSignupModal } from '~/composables/modal/useSignupModal'

const props = defineProps<{
  caseItem: CaseItem
}>()

const { data: settingsData } = await useCaseSettings()

const settings = computed<CaseSettings>(() => settingsData.value ?? ({} as CaseSettings))

const partMoney = computed<string>(() => {
  return getMoneyView(props.caseItem.part_price).value
})

const workMoney = computed<string>(() => {
  return getMoneyView(props.caseItem.work_price).value
})

const totalMoney = computed<string>(() => {
  return getMoneyView(props.caseItem.part_price + props.caseItem.work_price).value
})

const handleCalculateClick = (): void => {
  useRepairQuizModal().openModal()
}

const handleSignupClick = (): void => {
  useSignupModal().openModal()
}
</script>

<template>
  <div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
    <Gallery :images="caseItem.images" />

    <div class="flex flex-col gap-6">
      <div class="text-brand-grey space-y-3 text-base">
        <p>
          <span class="text-brand-dark font-bold">{{ settings.transmission_label }}</span>
          {{ caseItem.transmission }}
        </p>
        <p>
          <span class="text-brand-dark font-bold">{{ settings.model_date_label }}</span>
          {{ caseItem.model_date }}
        </p>
        <p>
          <span class="text-brand-dark font-bold">{{ settings.engine_label }}</span>
          {{ caseItem.engine }}
        </p>
        <p>
          <span class="text-brand-dark font-bold">{{ settings.mileage_label }}</span>
          {{ caseItem.mileage }}
        </p>
        <p>
          <span class="text-brand-dark font-bold">{{ settings.reason_label }}</span>
          {{ caseItem.reason }}
        </p>
        <p v-if="caseItem.problems">
          <span class="text-brand-dark font-bold">{{ settings.problems_label }}</span>
          {{ caseItem.problems }}
        </p>
      </div>

      <div v-if="caseItem.works.length > 0" class="space-y-3">
        <p class="text-brand-dark text-base font-bold">{{ settings.works_label }}</p>

        <ul class="text-brand-grey list-disc space-y-2 pl-5 text-base">
          <li v-for="work in caseItem.works" :key="work.id">
            {{ work.name }}
          </li>
        </ul>
      </div>

      <div class="grid grid-cols-3 gap-6 py-6">
        <div class="flex flex-col items-center gap-2 text-center">
          <CmsImage
            :src="settings.part_price_image"
            :alt="settings.part_price_image_alt"
            sizes="28px lg:35px"
            class="h-7 w-7 shrink-0 object-contain lg:h-8.75 lg:w-8.75" />

          <p class="text-brand-dark text-lg font-bold">{{ partMoney }}</p>
          <p class="text-brand-grey-light text-xs">{{ settings.part_price_label }}</p>
        </div>

        <div class="flex flex-col items-center gap-2 text-center">
          <CmsImage
            :src="settings.work_price_image"
            :alt="settings.work_price_image_alt"
            sizes="28px lg:35px"
            class="h-7 w-7 shrink-0 object-contain lg:h-8.75 lg:w-8.75" />

          <p class="text-brand-dark text-lg font-bold">{{ workMoney }}</p>
          <p class="text-brand-grey-light text-xs">{{ settings.work_price_label }}</p>
        </div>

        <div class="flex flex-col items-center gap-2 text-center">
          <CmsImage
            :src="settings.total_image"
            :alt="settings.total_image_alt"
            sizes="28px lg:35px"
            class="h-7 w-7 shrink-0 object-contain lg:h-8.75 lg:w-8.75" />

          <p class="text-brand-dark text-lg font-bold">{{ totalMoney }}</p>
          <p class="text-brand-grey-light text-xs">{{ settings.total_label }}</p>
        </div>
      </div>

      <ActionButtons
        :calculateLabel="settings.calculate_label"
        :signupLabel="settings.signup_label"
        @calculate="handleCalculateClick"
        @signup="handleSignupClick" />
    </div>
  </div>
</template>
