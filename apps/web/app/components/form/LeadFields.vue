<script setup lang="ts">
import { ref } from 'vue'

type LeadContactFieldsProps = {
  namePlaceholder?: string
  phonePlaceholder?: string
}

const props = withDefaults(defineProps<LeadContactFieldsProps>(), {
  namePlaceholder: 'Как вас зовут?',
  phonePlaceholder: '+7 (___) ___-__-__',
})

const nameModel = defineModel<string>('name', { required: true })
const phoneModel = defineModel<string>('phone', { required: true })
const consentModel = defineModel<boolean>('consent', { required: true })

const emit = defineEmits<{
  (eventName: 'enter'): void
}>()

const nameInputElementRef = ref<HTMLInputElement | null>(null)
const phoneInputElementRef = ref<HTMLInputElement | null>(null)

defineExpose({
  nameInputElementRef,
  phoneInputElementRef,
})

const handlePhoneEnter = (): void => {
  emit('enter')
}
</script>

<template>
  <div class="w-full">
    <div class="mt-2 space-y-4">
      <input
        ref="nameInputElementRef"
        v-model.trim="nameModel"
        type="text"
        class="border-brand-soft bg-brand-white text-brand-dark focus:border-brand-red h-16 w-full rounded-2xl border px-6 text-xl outline-none"
        :placeholder="props.namePlaceholder"
        autocomplete="name" />

      <input
        ref="phoneInputElementRef"
        v-model.trim="phoneModel"
        type="tel"
        class="border-brand-soft bg-brand-white text-brand-dark focus:border-brand-red h-16 w-full rounded-2xl border px-6 text-xl outline-none"
        :placeholder="props.phonePlaceholder"
        autocomplete="tel"
        inputmode="tel"
        @keydown.enter.prevent="handlePhoneEnter" />
    </div>

    <label class="text-brand-grey-light mt-6 flex items-start gap-3 text-base">
      <input v-model="consentModel" type="checkbox" class="accent-brand-red mt-1 h-5 w-5" />
      <span>
        Я принимаю <span class="text-brand-red">Политику обработки персональных данных</span> и даю
        согласие на их обработку.
      </span>
    </label>
  </div>
</template>
