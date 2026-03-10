<script setup lang="ts">
import type { SignupModalSettings } from '#shared/types/modal'

import { cn } from '#shared/lib/cn'
import { computed, onMounted, ref } from 'vue'

import { useLeadSubmit } from '~/composables/useLeadSubmit'
import { useSignupModalSettings } from '~/composables/useRepoApi'

const emit = defineEmits<{
  (event: 'close'): void
}>()

type FormInputExposed = {
  inputElementRef: HTMLInputElement | null
}

const nameInputRef = ref<FormInputExposed | null>(null)

const name = ref<string>('')
const phone = ref<string>('')
const agree = ref<boolean>(false)
const isSubmitting = ref<boolean>(false)

const { data: settingsData } = await useSignupModalSettings()

const settings = computed<SignupModalSettings>(
  () => settingsData.value ?? ({} as SignupModalSettings)
)

const { submitLead } = useLeadSubmit()

const isSubmitDisabled = computed<boolean>(() => {
  const hasPhone = phone.value.trim().length > 0
  return !agree.value || !hasPhone
})

const emitClose = (): void => {
  emit('close')
}

const submit = (): void => {
  if (isSubmitting.value) return

  void (async () => {
    isSubmitting.value = true

    try {
      await submitLead({
        source: 'signup',
        name: name.value.trim(),
        phone: phone.value.trim(),
      })

      emitClose()
    } catch {
      console.error('[lead] signup submit failed')
    } finally {
      isSubmitting.value = false
    }
  })()
}

const isDesktop = (): boolean => {
  if (!import.meta.client) return false
  return window.matchMedia('(min-width: 640px)').matches
}

onMounted(() => {
  if (!isDesktop()) return
  nameInputRef.value?.inputElementRef?.focus()
})
</script>

<template>
  <ModalWindow>
    <ModalClose @click="emitClose" />

    <div
      class="max-h-[85svh] overflow-y-auto px-5 pt-7 pb-6 sm:max-h-none sm:px-8 sm:pt-10 sm:pb-8">
      <div class="text-center">
        <div class="text-brand-red text-2xl font-extrabold tracking-wide uppercase sm:text-4xl">
          {{ settings.title }}
        </div>

        <div
          :class="
            cn(`
              text-brand-grey mx-auto mt-3 max-w-sm
              text-xs leading-relaxed sm:mt-4 sm:text-sm
            `)
          ">
          {{ settings.description }}
        </div>
      </div>

      <div class="mt-4 flex justify-center sm:mt-6">
        <CmsImage
          :src="settings.image_source"
          :alt="settings.image_alt"
          class="h-24 w-auto object-contain select-none sm:h-40"
          draggable="false" />
      </div>

      <form
        class="mt-5 space-y-3 sm:mt-6 sm:space-y-4"
        :aria-label="settings.form_aria_label"
        @submit.prevent="submit">
        <LeadFields
          :phoneLabel="settings.phone_label"
          :phonePlaceholder="settings.phone_placeholder"
          v-model:phone="phone"
          v-model:consent="agree"
          @enter="submit">
          <FormInput
            ref="nameInputRef"
            v-model="name"
            :label="settings.name_label"
            :placeholder="settings.name_placeholder"
            autocomplete="name" />
        </LeadFields>

        <SubmitButton :disabled="isSubmitDisabled || isSubmitting">
          {{ settings.submit_label }}
        </SubmitButton>
      </form>
    </div>
  </ModalWindow>
</template>
