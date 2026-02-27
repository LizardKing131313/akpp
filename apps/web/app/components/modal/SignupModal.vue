<script setup lang="ts">
import type { SingupModalPayload } from '#shared/lib/modal/useSignupModal'

import { cn } from '#shared/lib/cn'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  payload: SingupModalPayload | null
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const name = ref<string>('')
const phone = ref<string>('')
const agree = ref<boolean>(false)

const isSubmitDisabled = computed<boolean>(() => {
  const hasPhone = phone.value.trim().length > 0
  return !agree.value || !hasPhone
})

const emitClose = (): void => {
  emit('close')
}

const submit = (): void => {
  const payload = {
    modal: 'signup',
    source: props.payload?.source ?? 'unknown',
    name: name.value.trim(),
    phone: phone.value.trim(),
    agree: agree.value,
    createdAtIso: new Date().toISOString(),
  }

  // eslint-disable-next-line no-console
  console.log('[lead]', payload)

  emitClose()
}

const contactFieldsRef = ref<{ nameInputElementRef: HTMLInputElement | null } | null>(null)

const isDesktop = (): boolean => {
  if (!import.meta.client) return false
  return window.matchMedia('(min-width: 640px)').matches
}

onMounted(() => {
  if (!isDesktop()) return
  contactFieldsRef.value?.nameInputElementRef?.focus()
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
    <button
      type="button"
      :class="
        cn(`
          text-brand-grey hover:text-brand-grey-light absolute top-3
          right-3 grid h-9 w-9 place-items-center rounded-full transition
          sm:top-5 sm:right-5 sm:h-10 sm:w-10
        `)
      "
      aria-label="Закрыть окно"
      @click="emitClose">
      <span class="text-2xl leading-none">×</span>
    </button>

    <div
      class="max-h-[85svh] overflow-y-auto px-5 pt-7 pb-6 sm:max-h-none sm:px-8 sm:pt-10 sm:pb-8">
      <div class="text-center">
        <div class="text-brand-red text-2xl font-extrabold tracking-wide uppercase sm:text-4xl">
          Записаться
        </div>

        <div
          :class="
            cn(`
              text-brand-grey mx-auto mt-3 max-w-sm
              text-xs leading-relaxed sm:mt-4 sm:text-sm
            `)
          ">
          Оставьте заявку на бесплатную консультацию и наши специалисты свяжутся с Вами в самое
          ближайшее время
        </div>
      </div>

      <div class="mt-4 flex justify-center sm:mt-6">
        <NuxtImg
          src="/images/transmission.png"
          alt="akpp"
          class="h-24 w-auto object-contain select-none sm:h-40"
          draggable="false" />
      </div>

      <form
        class="mt-5 space-y-3 sm:mt-6 sm:space-y-4"
        aria-label="Записаться"
        @submit.prevent="submit">
        <LeadFields
          ref="contactFieldsRef"
          v-model:name="name"
          v-model:phone="phone"
          v-model:consent="agree"
          @enter="submit" />

        <button
          type="submit"
          aria-label="submit"
          :class="
            cn(`
              bg-brand-red/90 text-brand-soft hover:bg-brand-red mt-2 h-14 w-full
              rounded-full text-base font-semibold shadow-lg transition
              disabled:cursor-not-allowed disabled:opacity-60 sm:h-16 sm:text-lg
            `)
          "
          :disabled="isSubmitDisabled">
          Оставить заявку
        </button>
      </form>
    </div>
  </div>
</template>
