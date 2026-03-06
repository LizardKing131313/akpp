<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{
    label?: string
    phonePlaceholder?: string
  }>(),
  {
    label: 'Телефон',
    phonePlaceholder: '+7 (___) ___-__-__',
  }
)

const phoneModel = defineModel<string>('phone', { required: true })
const consentModel = defineModel<boolean>('consent', { required: true })

const emit = defineEmits<{
  (eventName: 'enter'): void
}>()

type FormInputExposed = {
  inputElementRef: HTMLInputElement | null
}

const phoneInputRef = ref<FormInputExposed | null>(null)

defineExpose({
  phoneInputElementRef: phoneInputRef,
})

const handlePhoneEnter = (): void => {
  emit('enter')
}
</script>

<template>
  <div class="w-full">
    <div class="mt-2 space-y-4">
      <slot />

      <FormInput
        ref="phoneInputRef"
        v-model="phoneModel"
        :label="label"
        :placeholder="phonePlaceholder"
        type="tel"
        inputmode="tel"
        autocomplete="tel"
        @enter="handlePhoneEnter" />
    </div>

    <LeadConsent v-model="consentModel" />
  </div>
</template>
