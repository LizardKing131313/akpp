<script setup lang="ts">
const modelValue = defineModel<boolean>({ required: true })
</script>

<template>
  <label class="text-brand-grey-light mt-6 flex items-start gap-3 text-base">
    <input v-model="modelValue" type="checkbox" class="accent-brand-red mt-1 h-5 w-5" />
    <span>
      Я принимаю <span class="text-brand-red">Политику обработки персональных данных</span> и даю
      согласие на их обработку.
    </span>
  </label>
</template>
