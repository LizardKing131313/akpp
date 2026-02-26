<script setup lang="ts">
import { ItemImage } from '#shared/types/components/image'
import { PerkItem } from '#shared/types/components/perk'

const perks: PerkItem[] = [
  new PerkItem({
    id: 'masters',
    title: 'Опытные мастера',
    description:
      'Наши мастера с опытом более 7 лет проходят обучение у официальных дилеров, имеют лицензии и гарантируют высокое качество ремонта.',
    logo: new ItemImage({ source: '/images/perks/masters.svg', alt: 'masters' }),
  }),
  new PerkItem({
    id: 'thumb_up',
    title: 'Более 10 лет на рынке',
    description:
      'Мы успешно работаем более 10 лет. Более 3000 клиентов доверили нам свои автомобили и рекомендуют нас друзьям и знакомым.',
    logo: new ItemImage({ source: '/images/perks/thumb_up.svg', alt: 'thumb_up' }),
  }),
  new PerkItem({
    id: 'cart',
    title: 'Запчасти в наличии',
    description:
      'Собственный склад новых и контрактных запчастей. Вы не ждёте доставки — мы выполняем ремонт без задержек и экономим ваше время.',
    logo: new ItemImage({ source: '/images/perks/cart.svg', alt: 'cart' }),
  }),
  new PerkItem({
    id: 'tools',
    title: 'Профессиональный инструмент',
    description:
      'Мы используем специализированный инструмент, позволяющий выполнять сложнейшие работы. Справимся с любой поломкой вашего автомобиля.',
    logo: new ItemImage({ source: '/images/perks/tools.svg', alt: 'tools' }),
  }),
  new PerkItem({
    id: 'flow',
    title: 'Современное оборудование',
    description:
      'Современное оборудование позволяет быстро и точно выявлять и устранять неисправности, экономя ваше время и деньги.',
    logo: new ItemImage({ source: '/images/perks/flow.svg', alt: 'flow' }),
  }),
  new PerkItem({
    id: 'star',
    title: 'Быстрая оценка ремонта',
    description:
      'Комплексная диагностика за 30 минут. Вы узнаете точную причину неисправности и стоимость ремонта сразу.',
    logo: new ItemImage({ source: '/images/perks/star.svg', alt: 'star' }),
  }),
]
</script>

<template>
  <section class="bg-surface-base py-16">
    <div class="mx-auto max-w-6xl px-4">
      <CenteredTitle>Почему клиенты выбирают нас</CenteredTitle>

      <div class="grid grid-cols-2 gap-x-10 gap-y-14 lg:grid-cols-3">
        <PerkCard v-for="perk in perks" :key="perk.id" :perk class="mx-auto w-full max-w-87.5" />
      </div>
    </div>
  </section>
</template>
