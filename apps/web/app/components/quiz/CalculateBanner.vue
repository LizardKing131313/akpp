<template>
  <div class="flex h-full flex-col justify-center gap-5 px-4 pt-12 sm:gap-8 lg:pt-0">
    <h2 class="text-brand-white text-2xl leading-tight font-bold sm:text-4xl">
      Рассчитать стоимость ремонта за <span class="text-brand-red">1 минуту</span>
    </h2>

    <p class="text-brand-grey-light text-xs leading-6 sm:text-lg">
      Ответьте на 3 вопроса и получите предварительную смету и скидку 10% на работы.
    </p>

    <div class="hidden space-y-4 lg:block">
      <div class="flex items-center gap-4">
        <Check />
        <span class="text-brand-white sm:text-xl">Точность оценки до 90%</span>
      </div>

      <div class="flex items-center gap-4">
        <Check />
        <span class="text-brand-white sm:text-xl">Консультация мастера бесплатно</span>
      </div>

      <div class="flex items-center gap-4">
        <Check />
        <span class="text-brand-white sm:text-xl">Бронирование времени без очереди</span>
      </div>
    </div>
  </div>
</template>
