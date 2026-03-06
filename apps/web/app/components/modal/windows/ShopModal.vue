<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { computed, onMounted, ref } from 'vue'

const emit = defineEmits<{
  (eventName: 'close'): void
}>()

const car = ref<string>('')
const vin = ref<string>('')
const phone = ref<string>('')
const consent = ref<boolean>(false)

const isSubmitDisabled = computed<boolean>(() => {
  const hasCar = car.value.trim().length > 0
  const hasPhone = phone.value.trim().length > 0
  return !consent.value || !hasCar || !hasPhone
})

const emitClose = (): void => {
  emit('close')
}

const submit = (): void => {
  const leadPayload = {
    car: car.value.trim(),
    vin: vin.value.trim(),
    phone: phone.value.trim(),
    consent: consent.value,
    createdAtIso: new Date().toISOString(),
  }

  // eslint-disable-next-line no-console
  console.log('[lead]', leadPayload)

  emitClose()
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
          Продажа АКПП
        </div>
      </div>

      <form class="mt-5 space-y-4" aria-label="Продажа АКПП" @submit.prevent="submit">
        <LeadFields v-model:phone="phone" v-model:consent="consent" @enter="submit">
          <FormInput
            ref="carInputRef"
            v-model="car"
            label="Автомобиль"
            placeholder="Автомобиль: марка, модель и год выпуска?"
            autocomplete="off" />

          <FormInput
            v-model="vin"
            label="VIN"
            placeholder="VIN номер автомобиля"
            autocomplete="off" />
        </LeadFields>

        <SubmitButton :disabled="isSubmitDisabled">Узнать цену</SubmitButton>
      </form>
    </div>
  </div>
</template>
