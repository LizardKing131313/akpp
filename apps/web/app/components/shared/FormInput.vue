<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { ref } from 'vue'

type InputMode = 'text' | 'search' | 'email' | 'tel' | 'url' | 'none' | 'numeric' | 'decimal'

interface InputProps {
  label: string
  placeholder?: string
  type?: string
  inputmode?: InputMode
  autocomplete?: string
  containerClass?: string
  labelClass?: string
  inputClass?: string
}

withDefaults(defineProps<InputProps>(), {
  placeholder: '',
  type: 'text',
  inputmode: 'none',
  autocomplete: '',
  containerClass: '',
  labelClass: '',
  inputClass: '',
})

const modelValue = defineModel<string>({ required: true })

const inputElementRef = ref<HTMLInputElement | null>(null)

defineExpose({
  inputElementRef,
})
</script>

<template>
  <label :class="cn('block', containerClass)">
    <span :class="cn('sr-only', labelClass)">{{ label }}</span>

    <input
      ref="inputElementRef"
      v-model.trim="modelValue"
      :type="type"
      :inputmode="inputmode"
      :placeholder="placeholder || label"
      :aria-label="label"
      :autocomplete="autocomplete"
      :class="
        cn(
          `
            bg-brand-dark/1 text-brand-dark placeholder:text-brand-grey-light
            focus:bg-brand-dark/1 focus:ring-brand-red h-16 w-full rounded-2xl
            px-6 text-base ring-0 transition outline-none focus:ring-2 focus:outline-none
          `,
          inputClass
        )
      " />
  </label>
</template>
