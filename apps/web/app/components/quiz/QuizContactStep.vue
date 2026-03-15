<script setup lang="ts">
import { computed, ref } from 'vue'

withDefaults(
  defineProps<{
    readonly brandTitle: string
    readonly problemTitle: string
    readonly symptomTitle: string
    readonly contextSummary?: string

    readonly title?: string
    readonly description?: string

    readonly autoLabel?: string
    readonly problemLabel?: string

    readonly nameLabel?: string
    readonly namePlaceholder?: string

    readonly phoneLabel?: string
    readonly phonePlaceholder?: string

    readonly submitLabel?: string
  }>(),
  {
    title: 'Готово! Получите расчет',
    description: 'Оставьте телефон, мастер уже делает смету.',

    autoLabel: 'Авто:',
    problemLabel: 'Проблема:',

    nameLabel: 'Имя',
    namePlaceholder: 'Как вас зовут?',

    phoneLabel: 'Телефон',
    phonePlaceholder: '+7 (___) ___-__-__',

    submitLabel: 'Узнать стоимость',
  }
)

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

  emit('submit', {
    customerName: nameValue,
    customerPhone: phoneValue,
  })
}
</script>

<template>
  <div class="w-full">
    <QuizStepTitle :title="title">
      {{ description }}
    </QuizStepTitle>

    <div class="text-brand-dark mt-5 space-y-2 text-sm font-bold">
      <div>
        {{ autoLabel }}
        <span class="font-medium">
          {{ brandTitle }}
        </span>
      </div>

      <div>
        {{ problemLabel }}
        <span class="font-medium">
          {{ problemTitle }}
        </span>
      </div>

      <div class="text-brand-grey-light">
        {{ symptomTitle }}
      </div>

      <div v-if="contextSummary" class="text-brand-grey-light">
        {{ contextSummary }}
      </div>
    </div>

    <LeadFields
      :phoneLabel="phoneLabel"
      :phonePlaceholder="phonePlaceholder"
      v-model:phone="customerPhone"
      v-model:consent="isConsentAccepted"
      @enter="handleSubmit">
      <FormInput
        v-model="customerName"
        :label="nameLabel"
        :placeholder="namePlaceholder"
        autocomplete="name" />
    </LeadFields>

    <MainButton
      :disabled="isSubmitDisabled"
      @click="handleSubmit"
      class="mt-8 flex items-center justify-center gap-3">
      {{ submitLabel }}
      <Arrow direction="right" class="text-brand-white" />
    </MainButton>
  </div>
</template>
