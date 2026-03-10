<script setup lang="ts">
import type { PolicySettings } from '#shared/types/policy'

import { computed } from 'vue'

import { usePolicySettings } from '~/composables/useRepoApi'

const modelValue = defineModel<boolean>({ required: true })

const { data: settingsData } = await usePolicySettings()

const settings = computed<PolicySettings>(() => settingsData.value ?? ({} as PolicySettings))
</script>

<template>
  <label class="text-brand-grey-light mt-6 flex items-start gap-3 text-base">
    <input v-model="modelValue" type="checkbox" class="accent-brand-red mt-1 h-5 w-5" />
    <span>
      {{ settings.lead_accept }}
      <NuxtLink to="/policy" class="text-brand-red">
        {{ settings.lead_policy }}
      </NuxtLink>
      {{ settings.lead_agreement }}
    </span>
  </label>
</template>
