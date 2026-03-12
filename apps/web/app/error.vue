<script setup lang="ts">
import type { ErrorSettings } from '#shared/types/error'

import { cn } from '#shared/lib/cn'

const error = useError()

const status = computed<number>(() => {
  return Number(error.value?.status ?? 404)
})

const statusCharacters = computed<string[]>(() => {
  return String(status.value).split('')
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
    <Section>
      <section class="bg-brand-soft/35 rounded-4xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div class="mx-auto flex max-w-5xl flex-col items-center text-center">
          <div
            :class="
              cn(`
              text-brand-dark flex items-end justify-center text-[7rem] leading-none
                font-extrabold tracking-[-0.08em] sm:text-[10rem] lg:text-[16rem]
            `)
            ">
            <span
              v-for="(character, index) in statusCharacters"
              :key="`${character}-${index}`"
              :class="index === 1 ? 'text-brand-red mx-1 inline-block sm:mx-2 lg:mx-3' : ''">
              {{ character }}
            </span>
          </div>

          <CenteredTitle class="mt-8 text-3xl font-semibold sm:text-4xl lg:mt-10 lg:text-6xl">
            {{ title }}
          </CenteredTitle>

          <p class="text-brand-grey mt-5 max-w-2xl text-base sm:text-lg lg:text-2xl">
            {{ description }}
          </p>

          <MainButton
            @click="handleClearError"
            class="mx-auto mt-10 block w-auto min-w-56 px-10 lg:mt-14 lg:px-14">
            {{ buttonText }}
          </MainButton>
        </div>
      </section>
    </Section>
  </App>
</template>
