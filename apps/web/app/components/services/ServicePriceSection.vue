<script setup lang="ts">
import { PriceItem } from '#shared/types/components/price'
import { ServicePriceItem } from '#shared/types/components/service'

const servicePrices = [
  new ServicePriceItem({
    id: 'diagnostics-repair',
    title: 'Диагностика АКПП (при ремонте)',
    price: new PriceItem({ price: 0 }),
  }),

  new ServicePriceItem({
    id: 'diagnostics-lift',
    title: 'Диагностика АКПП на подъемнике',
    price: new PriceItem({ price: 1000 }),
  }),

  new ServicePriceItem({
    id: 'tow-truck-repair',
    title: 'Эвакуатор до сервиса (при ремонте)',
    price: new PriceItem({ price: 0 }),
  }),

  new ServicePriceItem({
    id: 'gearbox-removal',
    title: 'Демонтаж АКПП',
    price: new PriceItem({ price: 7500, priceFromText: 'от' }),
  }),

  new ServicePriceItem({
    id: 'gearbox-installation',
    title: 'Установка АКПП',
    price: new PriceItem({ price: 7500, priceFromText: 'от' }),
  }),

  new ServicePriceItem({
    id: 'gearbox-assembly',
    title: 'Сборка АКПП',
    price: new PriceItem({ price: 7500, priceFromText: 'от' }),
  }),

  new ServicePriceItem({
    id: 'solenoid-test',
    title: 'Тест соленоидов на стенде (за шт.)',
    price: new PriceItem({ price: 900 }),
  }),

  new ServicePriceItem({
    id: 'solenoid-repair',
    title: 'Ремонт и замена соленоидов',
    price: new PriceItem({ price: 2900, priceFromText: 'от' }),
  }),

  new ServicePriceItem({
    id: 'adaptation',
    title: 'Адаптация (отдельная услуга)',
    price: new PriceItem({ price: 1900, priceFromText: 'от' }),
  }),

  new ServicePriceItem({
    id: 'defecting',
    title: 'Дефектовка АКПП',
    price: new PriceItem({ price: 5800, priceFromText: 'от' }),
  }),

  new ServicePriceItem({
    id: 'valve-body-repair',
    title: 'Ремонт гидроблока',
    price: new PriceItem({ price: 26000, priceFromText: 'от' }),
  }),

  new ServicePriceItem({
    id: 'valve-body-remove-install',
    title: 'Снятие и установка гидроблока',
    price: new PriceItem({ price: 3500, priceFromText: 'от' }),
  }),

  new ServicePriceItem({
    id: 'valve-body-diagnostics',
    title: 'Диагностика гидроблока',
    price: new PriceItem({ price: 7000, priceFromText: 'от' }),
  }),

  new ServicePriceItem({
    id: 'torque-converter-repair',
    title: 'Ремонт гидротрансформаторов',
    price: new PriceItem({ price: 7900, priceFromText: 'от' }),
  }),

  new ServicePriceItem({
    id: 'ecu-repair',
    title: 'Ремонт ЭБУ (при возможности)',
    price: new PriceItem({ price: 12900, priceFromText: 'от' }),
  }),

  new ServicePriceItem({
    id: 'selector-repair',
    title: 'Ремонт и замена селектора',
    price: new PriceItem({ price: 1600, priceFromText: 'от' }),
  }),
]
</script>

<template>
  <div class="flex h-105.75 w-full flex-col space-y-8">
    <CenteredTitle class="text-left">Стоимость услуг</CenteredTitle>

    <div class="min-h-0 flex-1 overflow-y-auto">
      <ServicePriceCard
        v-for="servicePrice in servicePrices"
        :key="servicePrice.id"
        :servicePrice />
    </div>
  </div>
</template>
