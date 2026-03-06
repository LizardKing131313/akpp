<script setup lang="ts">
withDefaults(
  defineProps<{
    readonly title?: string
    readonly line1?: string
    readonly line2?: string
  }>(),
  {
    title: 'Спасибо!',
    line1: 'Ваши ответы отправлены мастеру.',
    line2: 'Мы свяжемся с вами в ближайшее время для консультации.',
  }
)
</script>

<template>
  <div class="flex min-h-130 w-full flex-col items-center justify-center text-center">
    <div class="bg-brand-white flex h-16 w-16 items-center justify-center rounded-2xl">
      <svg class="text-brand-red h-10 w-10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9.2 12.6l1.8 1.8L15.8 9.6"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round" />
        <path
          d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </div>

    <h3 class="text-brand-dark mt-6 text-3xl font-extrabold">
      {{ title }}
    </h3>

    <p class="text-brand-dark mt-4 text-xl">
      {{ line1 }}
    </p>

    <p class="text-brand-dark mt-2 text-xl">
      {{ line2 }}
    </p>
  </div>
</template>
