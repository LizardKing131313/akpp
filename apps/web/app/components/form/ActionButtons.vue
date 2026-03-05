<script setup lang="ts">
import { cn } from '#shared/lib/cn'

const emit = defineEmits<{
  (event: 'calculate'): void
  (event: 'signup'): void
}>()

withDefaults(
  defineProps<{
    calculateLabel?: string
    signupLabel?: string
  }>(),
  {
    calculateLabel: 'Рассчитать стоимость',
    signupLabel: 'Записаться',
  }
)

const handleCalculateClick = (): void => {
  emit('calculate')
}

const handleSignupClick = (): void => {
  emit('signup')
}
</script>

<template>
  <div class="flex flex-col gap-4 sm:flex-row">
    <MainButton @click="handleCalculateClick">
      {{ calculateLabel }}
    </MainButton>

    <MainButton
      @click="handleSignupClick"
      :class="
        cn(`
          bg-brand-grey text-brand-white relative w-full overflow-hidden
          rounded-full border-0 py-4 text-2xl font-bold transition hover:opacity-95
        `)
      ">
      <span
        :class="
          cn(`
            pointer-events-none absolute inset-0
            bg-[linear-gradient(135deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.15)_25%,transparent_25%)]
          `)
        "></span>
      {{ signupLabel }}
    </MainButton>
  </div>
</template>
