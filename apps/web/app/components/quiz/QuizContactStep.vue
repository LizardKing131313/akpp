<script setup lang="ts">
import { computed, ref } from 'vue'

defineProps<{
  brandTitle: string
  problemTitle: string
  symptomTitle: string
}>()

const emit = defineEmits<{
  (event: 'edit'): void
  (event: 'submit', payload: { customerName: string; customerPhone: string }): void
}>()

const customerName = ref<string>('')
const customerPhone = ref<string>('')
const isConsentAccepted = ref<boolean>(true)

const isSubmitDisabled = computed<boolean>(() => {
  if (!isConsentAccepted.value) return true
  if (customerName.value.trim().length === 0) return true
  return customerPhone.value.trim().length === 0
})

const handleSubmit = (): void => {
  const nameValue = customerName.value.trim()
  const phoneValue = customerPhone.value.trim()
  if (nameValue.length === 0 || phoneValue.length === 0) return
  if (!isConsentAccepted.value) return
  emit('submit', { customerName: nameValue, customerPhone: phoneValue })
}
</script>

<template>
  <div class="w-full">
    <QuizStepTitle title="Готово! Получите расчет">
      Оставьте телефон, мастер уже делает смету.
    </QuizStepTitle>

    <div class="text-brand-dark font-bol mt-5 space-y-2 text-sm">
      <div>
        Авто: <span class="font-medium">{{ brandTitle }}</span>
      </div>

      <div>
        Проблема: <span class="font-medium">{{ problemTitle }}</span>
      </div>

      <div class="text-brand-grey-light">
        {{ symptomTitle }}
      </div>
    </div>

    <LeadFields
      v-model:name="customerName"
      v-model:phone="customerPhone"
      v-model:consent="isConsentAccepted"
      @enter="handleSubmit" />

    <button
      type="button"
      class="bg-brand-red text-brand-white mt-8 flex h-16 w-full items-center justify-center gap-3 rounded-2xl px-8 text-xl font-extrabold transition-colors hover:opacity-95 disabled:opacity-40"
      :disabled="isSubmitDisabled"
      @click="handleSubmit">
      Узнать стоимость
      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fill-rule="evenodd"
          d="M7.22 15.78a.75.75 0 0 1 0-1.06L11.94 10 7.22 5.28a.75.75 0 1 1 1.06-1.06l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 0 1-1.06 0Z"
          clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>
