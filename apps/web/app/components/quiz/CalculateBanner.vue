<script setup lang="ts">
withDefaults(
  defineProps<{
    readonly title?: string
    readonly accentTitle?: string
    readonly description?: string

    readonly firstBenefit?: string
    readonly secondBenefit?: string
    readonly thirdBenefit?: string
  }>(),
  {
    title: 'Рассчитать стоимость ремонта за',
    accentTitle: '1 минуту',
    description: 'Ответьте на 3 вопроса и получите предварительную смету и скидку 10% на работы.',

    firstBenefit: 'Точность оценки до 90%',
    secondBenefit: 'Консультация мастера бесплатно',
    thirdBenefit: 'Бронирование времени без очереди',
  }
)
</script>

<template>
  <div class="flex h-full flex-col justify-center gap-5 px-4 pt-12 sm:gap-8 lg:pt-0">
    <h2 class="text-brand-white text-2xl leading-tight font-bold sm:text-4xl">
      {{ title }}
      <span class="text-brand-red"> {{ accentTitle }} </span>
    </h2>

    <p class="text-brand-grey-light text-xs leading-6 sm:text-lg">
      {{ description }}
    </p>

    <div class="hidden space-y-4 lg:block">
      <div class="flex items-center gap-4">
        <Check />
        <span class="text-brand-white sm:text-xl">{{ firstBenefit }}</span>
      </div>

      <div class="flex items-center gap-4">
        <Check />
        <span class="text-brand-white sm:text-xl">{{ secondBenefit }}</span>
      </div>

      <div class="flex items-center gap-4">
        <Check />
        <span class="text-brand-white sm:text-xl">{{ thirdBenefit }}</span>
      </div>
    </div>
  </div>
</template>
