<script setup lang="ts">
import type { ErrorSettings } from '#shared/types/error'

const error = useError()

const status = computed<number>(() => {
  return Number(error.value?.status ?? 404)
})

const handleClearError = (): void => {
  void clearError({ redirect: '/' })
}

withDefaults(defineProps<ErrorSettings>(), {
  title: 'Страница не найдена',
  description: 'Возможно ссылка устарела или страница была удалена',
  buttonText: 'На главную',
})
</script>

<template>
  <App>
    <div class="space-y-8">
      <CenteredTitle class="text-brand-red">{{ status }}</CenteredTitle>
      <CenteredTitle>{{ title }}</CenteredTitle>
      <CenteredTitle>{{ description }}</CenteredTitle>
      <MainButton
        @click="handleClearError"
        class="mx-auto mt-32 block w-auto items-center justify-center px-14"
        >{{ buttonText }}</MainButton
      >
    </div>
  </App>
</template>
