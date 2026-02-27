<script setup lang="ts">
import { cn } from '#shared/lib/cn'

defineProps<{
  pulse?: boolean
}>()

const quizProblems = [
  'Автомобиль не едет',
  'Пинается при переключении',
  'Пробуксовка передач',
  'Появился шум или гул',
  'Ошибка на панели приборов',
] as const

const quizSymptoms: Readonly<Record<string, readonly string[]>> = {
  'Автомобиль не едет': ['Не едет вперед', 'Не едет назад', 'Не едет ни вперед ни назад'],
  'Пинается при переключении': [
    'Рывок при включении D',
    'Пинок со 2 на 3 передачу',
    'Пинок при торможении',
  ],
  'Пробуксовка передач': [
    'Обороты растут, машина не разгоняется',
    'Пробуксовка на холодную',
    'Пробуксовка после прогрева',
  ],
  'Появился шум или гул': ['Гул на скорости', 'Шум при разгоне', 'Странный металлический звук'],
  'Ошибка на панели приборов': [
    'Горит check',
    'Горит индикатор коробки',
    'Машина ушла в аварийный режим',
  ],
}

const brands = [
  new BrandItem({
    id: 'audi',
    title: 'Audi',
    href: '/brands/audi',
    logo: new ItemImage({ source: '/images/brands/audi.png', alt: 'Audi logo' }),
  }),
  new BrandItem({
    id: 'bmw',
    title: 'BMW',
    href: '/brands/bmw',
    logo: new ItemImage({ source: '/images/brands/bmw.png', alt: 'BMW logo' }),
  }),
  new BrandItem({
    id: 'changan',
    title: 'Changan',
    href: '/brands/changan',
    logo: new ItemImage({ source: '/images/brands/changan.png', alt: 'Changan logo' }),
  }),
  new BrandItem({
    id: 'chery',
    title: 'Chery',
    href: '/brands/chery',
    logo: new ItemImage({ source: '/images/brands/chery.png', alt: 'Chery logo' }),
  }),
  new BrandItem({
    id: 'citroen',
    title: 'Citroen',
    href: '/brands/citroen',
    logo: new ItemImage({ source: '/images/brands/citroen.png', alt: 'Citroen logo' }),
  }),
  new BrandItem({
    id: 'exeed',
    title: 'Exeed',
    href: '/brands/exeed',
    logo: new ItemImage({ source: '/images/brands/exeed.png', alt: 'Exeed logo' }),
  }),
  new BrandItem({
    id: 'ford',
    title: 'Ford',
    href: '/brands/ford',
    logo: new ItemImage({ source: '/images/brands/ford.png', alt: 'Ford logo' }),
  }),
  new BrandItem({
    id: 'gac',
    title: 'GAC',
    href: '/brands/gac',
    logo: new ItemImage({ source: '/images/brands/gac.png', alt: 'GAC logo' }),
  }),
  new BrandItem({
    id: 'geely',
    title: 'Geely',
    href: '/brands/geely',
    logo: new ItemImage({ source: '/images/brands/geely.png', alt: 'Geely logo' }),
  }),
  new BrandItem({
    id: 'haval',
    title: 'Haval',
    href: '/brands/haval',
    logo: new ItemImage({ source: '/images/brands/haval.png', alt: 'Haval logo' }),
  }),
  new BrandItem({
    id: 'honda',
    title: 'Honda',
    href: '/brands/honda',
    logo: new ItemImage({ source: '/images/brands/honda.png', alt: 'Honda logo' }),
  }),
  new BrandItem({
    id: 'hyundai',
    title: 'Hyundai',
    href: '/brands/hyundai',
    logo: new ItemImage({ source: '/images/brands/hyundai.png', alt: 'Hyundai logo' }),
  }),
  new BrandItem({
    id: 'jaecoo',
    title: 'Jaecoo',
    href: '/brands/jaecoo',
    logo: new ItemImage({ source: '/images/brands/jaecoo.png', alt: 'Jaecoo logo' }),
  }),
  new BrandItem({
    id: 'jeep',
    title: 'Jeep',
    href: '/brands/jeep',
    logo: new ItemImage({ source: '/images/brands/jeep.png', alt: 'Jeep logo' }),
  }),
  new BrandItem({
    id: 'kia',
    title: 'KIA',
    href: '/brands/kia',
    logo: new ItemImage({ source: '/images/brands/kia.png', alt: 'KIA logo' }),
  }),
  new BrandItem({
    id: 'lexus',
    title: 'Lexus',
    href: '/brands/lexus',
    logo: new ItemImage({ source: '/images/brands/lexus.png', alt: 'Lexus logo' }),
  }),
  new BrandItem({
    id: 'mazda',
    title: 'Mazda',
    href: '/brands/mazda',
    logo: new ItemImage({ source: '/images/brands/mazda.png', alt: 'Mazda logo' }),
  }),
  new BrandItem({
    id: 'mercedes',
    title: 'Mercedes',
    href: '/brands/mercedes',
    logo: new ItemImage({ source: '/images/brands/mercedes.png', alt: 'Mercedes logo' }),
  }),
  new BrandItem({
    id: 'mitsubishi',
    title: 'Mitsubishi',
    href: '/brands/mitsubishi',
    logo: new ItemImage({ source: '/images/brands/mitsubishi.png', alt: 'Mitsubishi logo' }),
  }),
  new BrandItem({
    id: 'nissan',
    title: 'Nissan',
    href: '/brands/nissan',
    logo: new ItemImage({ source: '/images/brands/nissan.png', alt: 'Nissan logo' }),
  }),
  new BrandItem({
    id: 'omoda',
    title: 'Omoda',
    href: '/brands/omoda',
    logo: new ItemImage({ source: '/images/brands/omoda.png', alt: 'Omoda logo' }),
  }),
  new BrandItem({
    id: 'opel',
    title: 'Opel',
    href: '/brands/opel',
    logo: new ItemImage({ source: '/images/brands/opel.png', alt: 'Opel logo' }),
  }),
  new BrandItem({
    id: 'peugeot',
    title: 'Peugeot',
    href: '/brands/peugeot',
    logo: new ItemImage({ source: '/images/brands/peugeot.png', alt: 'Peugeot logo' }),
  }),
  new BrandItem({
    id: 'renault',
    title: 'Renault',
    href: '/brands/renault',
    logo: new ItemImage({ source: '/images/brands/renault.png', alt: 'Renault logo' }),
  }),
  new BrandItem({
    id: 'chevrolet',
    title: 'Chevrolet',
    href: '/brands/chevrolet',
    logo: new ItemImage({ source: '/images/brands/shevrolet.png', alt: 'Chevrolet logo' }),
  }),
  new BrandItem({
    id: 'skoda',
    title: 'Skoda',
    href: '/brands/skoda',
    logo: new ItemImage({ source: '/images/brands/skoda.png', alt: 'Skoda logo' }),
  }),
  new BrandItem({
    id: 'ssangyong',
    title: 'SsangYong',
    href: '/brands/ssangyong',
    logo: new ItemImage({ source: '/images/brands/ssangyong.png', alt: 'SsangYong logo' }),
  }),
  new BrandItem({
    id: 'tank',
    title: 'Tank',
    href: '/brands/tank',
    logo: new ItemImage({ source: '/images/brands/tank.png', alt: 'Tank logo' }),
  }),
  new BrandItem({
    id: 'toyota',
    title: 'Toyota',
    href: '/brands/toyota',
    logo: new ItemImage({ source: '/images/brands/toyota.png', alt: 'Toyota logo' }),
  }),
  new BrandItem({
    id: 'volkswagen',
    title: 'Volkswagen',
    href: '/brands/volkswagen',
    logo: new ItemImage({ source: '/images/brands/volkswagen.png', alt: 'Volkswagen logo' }),
  }),
  new BrandItem({
    id: 'volvo',
    title: 'Volvo',
    href: '/brands/volvo',
    logo: new ItemImage({ source: '/images/brands/volvo.png', alt: 'Volvo logo' }),
  }),
]

import { useRepairQuizModal } from '#shared/lib/modal/useRepairQuizModal'
//import { useSignupModal } from '#shared/lib/modal/useSignupModal'
import { BrandItem } from '#shared/types/components/brand'
import { ItemImage } from '#shared/types/components/image'

//const { openSignupModal } = useSignupModal()
const { openRepairQuizModal } = useRepairQuizModal()

const handleClick = (): void => {
  //openSignupModal('footer')
  openRepairQuizModal({
    brands,
    problems: quizProblems,
    symptoms: quizSymptoms,
  })
}
</script>

<template>
  <button
    :class="
      cn(`
        bg-brand-red fixed right-6 bottom-6 z-50 hidden h-18.25 w-18.25 items-center
        justify-center rounded-full shadow-xl transition-transform
        duration-200 hover:scale-105 active:scale-95 lg:flex
      `)
    "
    @click="handleClick">
    <span
      v-if="pulse"
      class="bg-brand-red absolute inset-0 animate-ping rounded-full opacity-40"></span>
    <span
      v-if="pulse"
      class="bg-brand-red absolute inset-0 scale-110 animate-ping rounded-full opacity-20"></span>

    <NuxtImg
      src="/images/icons/telephone.svg"
      alt="Позвонить"
      width="28"
      height="28"
      class="relative h-7 w-7 shrink-0"
      loading="eager" />
  </button>
</template>
