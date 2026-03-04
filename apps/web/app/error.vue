<script setup lang="ts">
import type { ErrorSettings } from '#shared/types/404'

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
    <div class="mx-auto max-w-6xl items-center justify-center px-6 text-center">
      <div class="space-y-6">
        <h1 class="text-brand-red text-6xl font-bold">
          {{ status }}
        </h1>

        <h2 class="text-2xl font-bold">{{ title }}</h2>

        <p class="text-brand-grey">{{ description }}</p>

        <MainButton @click="handleClearError">{{ buttonText }}</MainButton>
      </div>
    </div>
  </App>
</template>
