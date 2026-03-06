<script setup lang="ts">
const modelValue = defineModel<boolean>({ required: true })

withDefaults(defineProps<{ accept?: string; policy?: string; agreement?: string }>(), {
  accept: 'Я принимаю',
  policy: 'Политику обработки персональных данных',
  agreement: 'и даю согласие на их обработку.',
})
</script>

<template>
  <label class="text-brand-grey-light mt-6 flex items-start gap-3 text-base">
    <input v-model="modelValue" type="checkbox" class="accent-brand-red mt-1 h-5 w-5" />
    <span>
      {{ accept }} <span class="text-brand-red">{{ policy }}</span> {{ agreement }}
    </span>
  </label>
</template>
