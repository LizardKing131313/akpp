<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { computed, onMounted, ref } from 'vue'

import { useLeadSubmit } from '~/composables/useLeadSubmit'
import { useModalWindowsUiSettings } from '~/composables/useModalWindowsUiSettings'

const emit = defineEmits<{
  (eventName: 'close'): void
}>()

const car = ref<string>('')
const vin = ref<string>('')
const phone = ref<string>('')
const consent = ref<boolean>(false)
const isSubmitting = ref<boolean>(false)
const modalSettings = useModalWindowsUiSettings()
const settings = computed(() => modalSettings.value.shop)

const { submitLead } = useLeadSubmit()

const isSubmitDisabled = computed<boolean>(() => {
  const hasCar = car.value.trim().length > 0
  const hasPhone = phone.value.trim().length > 0
  return !consent.value || !hasCar || !hasPhone
})

const emitClose = (): void => {
  emit('close')
}

const submit = (): void => {
  if (isSubmitting.value) return

  const carValue = car.value.trim()
  const vinValue = vin.value.trim()

  void (async () => {
    isSubmitting.value = true

    try {
      await submitLead({
        source: 'shop',
        phone: phone.value.trim(),
        comment: vinValue.length > 0 ? `Авто: ${carValue}\nVIN: ${vinValue}` : `Авто: ${carValue}`,
      })

      emitClose()
    } catch {
      console.error('[lead] shop submit failed')
    } finally {
      isSubmitting.value = false
    }
  })()
}

type FormInputExposed = {
  inputElementRef: HTMLInputElement | null
}

const carInputRef = ref<FormInputExposed | null>(null)

const isDesktop = (): boolean => {
  if (!import.meta.client) return false
  return window.matchMedia('(min-width: 640px)').matches
}

onMounted(() => {
  if (!isDesktop()) return
  carInputRef.value?.inputElementRef?.focus()
})
</script>

<template>
  <div
    :class="
      cn(`
        bg-brand-white relative w-full max-w-md
          overflow-hidden rounded-2xl shadow-2xl sm:rounded-[28px]
      `)
    ">
    <ModalClose @click="emitClose" />

    <div class="px-5 pt-6 pb-6 sm:px-8 sm:pt-8 sm:pb-8">
      <div class="text-left">
        <div class="text-brand-dark text-2xl font-extrabold tracking-wide uppercase sm:text-3xl">
          {{ settings.title }}
        </div>
      </div>

      <form class="mt-5 space-y-4" :aria-label="settings.form_aria_label" @submit.prevent="submit">
        <LeadFields v-model:phone="phone" v-model:consent="consent" @enter="submit">
          <FormInput
            ref="carInputRef"
            v-model="car"
            :label="settings.car_label"
            :placeholder="settings.car_placeholder"
            autocomplete="off" />

          <FormInput
            v-model="vin"
            :label="settings.vin_label"
            :placeholder="settings.vin_placeholder"
            autocomplete="off" />
        </LeadFields>

        <SubmitButton :disabled="isSubmitDisabled || isSubmitting">
          {{ settings.submit_label }}
        </SubmitButton>
      </form>
    </div>
  </div>
</template>
