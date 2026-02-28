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

    <div class="text-brand-dark mt-5 space-y-2 text-sm font-bold">
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
      v-model:phone="customerPhone"
      v-model:consent="isConsentAccepted"
      @enter="handleSubmit">
      <FormInput
        v-model="customerName"
        label="Имя"
        placeholder="Как вас зовут?"
        autocomplete="name" />
    </LeadFields>

    <MainButton
      :disabled="isSubmitDisabled"
      @click="handleSubmit"
      class="mt-8 flex items-center justify-center gap-3">
      Узнать стоимость <Arrow direction="right" class="text-brand-white" />
    </MainButton>
  </div>
</template>
