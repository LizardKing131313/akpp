<script setup lang="ts">
import { BreadcrumbItem } from '#shared/types/layout/breadcrumb'

definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    title: 'Продажа АКПП',
    backgroundSrc: '/images/breadcrumbs.jpg',
    items: [
      new BreadcrumbItem({ label: 'Главная', to: '/' }),
      new BreadcrumbItem({ label: 'Продажа АКПП', to: '/shop' }),
    ],
  },
})

type ProductGridItem = {
  id: string
  title: string
  description: string
  price: string
  imageSrc: string
  imageAlt: string
}

const items: ProductGridItem[] = [
  {
    id: '09g',
    title: 'АКПП 09G',
    description: 'Устанавливается на следующие марки автомобилей: Audi, Volkswagen',
    price: '120 000 руб.',
    imageSrc: '/images/shop/09G.jpg',
    imageAlt: 'АКПП 09G',
  },
  {
    id: '4f27e',
    title: 'АКПП 4F27E',
    description: 'Устанавливается на следующие марки автомобилей: Ford, Hongqi, Mazda',
    price: '60 000 руб.',
    imageSrc: '/images/shop/4F27E.png',
    imageAlt: 'АКПП 4F27E',
  },
  {
    id: '5l40',
    title: 'АКПП 5L40',
    description:
      'Устанавливается на следующие марки автомобилей: BMW, Buick, Cadillac, Holden, Land Rover, Opel, Pontiac, Saturn',
    price: '60 000 руб.',
    imageSrc: '/images/shop/5L40.png',
    imageAlt: 'АКПП 5L40',
  },
  {
    id: '6hp21',
    title: 'АКПП 6HP21',
    description: 'Устанавливается на следующие марки автомобилей: BMW, Audi, Volkswagen',
    price: '80 000 руб.',
    imageSrc: '/images/shop/6HP21.png',
    imageAlt: 'АКПП 6HP21',
  },
  {
    id: '6t30',
    title: 'АКПП 6T30',
    description:
      'Устанавливается на следующие марки автомобилей: Buick, Chevrolet, Daewoo, Opel, Pontiac, Saab, Saturn',
    price: '60 000 руб.',
    imageSrc: '/images/shop/6T30.png',
    imageAlt: 'АКПП 6T30',
  },
  {
    id: '6t40',
    title: 'АКПП 6T40',
    description:
      'Устанавливается на следующие марки автомобилей: Buick, Chevrolet, Daewoo, Opel, Pontiac, Saab, Saturn',
    price: '90 000 руб.',
    imageSrc: '/images/shop/6T40.png',
    imageAlt: 'АКПП 6T40',
  },
  {
    id: '722-6',
    title: 'АКПП 722.6',
    description:
      'Устанавливается на следующие марки автомобилей: Chrysler, Dodge, Jaguar, Jeep, Mercedes',
    price: '85 000 руб.',
    imageSrc: '/images/shop/722.6.jpg',
    imageAlt: 'АКПП 722.6',
  },
  {
    id: '722-9',
    title: 'АКПП 722.9',
    description: 'Устанавливается на следующие марки автомобилей: Mercedes, SsangYong',
    price: '90 000 руб.',
    imageSrc: '/images/shop/722.9.png',
    imageAlt: 'АКПП 722.9',
  },
  {
    id: 'a4cf1',
    title: 'АКПП A4CF1',
    description: 'Устанавливается на следующие марки автомобилей: Hyundai, Kia',
    price: '65 000 руб.',
    imageSrc: '/images/shop/A4CF1.png',
    imageAlt: 'АКПП A4CF1',
  },
  {
    id: 'a6gf1',
    title: 'АКПП A6GF1',
    description: 'Устанавливается на следующие марки автомобилей: Hyundai, Kia',
    price: '85 000 руб.',
    imageSrc: '/images/shop/A6GF1.png',
    imageAlt: 'АКПП A6GF1',
  },
  {
    id: 'a6mf1',
    title: 'АКПП A6MF1',
    description: 'Устанавливается на следующие марки автомобилей: Hyundai, Kia',
    price: '85 000 руб.',
    imageSrc: '/images/shop/A6MF1.png',
    imageAlt: 'АКПП A6MF1',
  },
  {
    id: 'ab60',
    title: 'АКПП AB60',
    description: 'Устанавливается на следующие марки автомобилей: Dodge, Isuzu, Toyota',
    price: '150 000 руб.',
    imageSrc: '/images/shop/AB60.png',
    imageAlt: 'АКПП AB60',
  },
  {
    id: 'aw55-51sn',
    title: 'АКПП AW55-51SN',
    description:
      'Устанавливается на следующие марки автомобилей: Ford, Infiniti, Roewe, Samsung, Volvo',
    price: '55 000 руб.',
    imageSrc: '/images/shop/AW55-51SN.png',
    imageAlt: 'АКПП AW55-51SN',
  },
  {
    id: 'fnr5',
    title: 'АКПП FNR5',
    description: 'Устанавливается на следующие марки автомобилей: FAW, Ford, Mazda, Mercury',
    price: '50 000 руб.',
    imageSrc: '/images/shop/FNR5.jpg',
    imageAlt: 'АКПП FNR5',
  },
  {
    id: 'jf011',
    title: 'АКПП JF011',
    description:
      'Устанавливается на следующие марки автомобилей: Citroen, Dodge, Jeep, Mitsubishi, Nissan, Peugeot, Renault, Suzuki',
    price: 'от 80 000 руб.',
    imageSrc: '/images/shop/JF011.png',
    imageAlt: 'АКПП JF011',
  },
  {
    id: 're5r05a',
    title: 'АКПП RE5R05A',
    description: 'Устанавливается на следующие марки автомобилей: Hyundai, Infiniti, Kia, Nissan',
    price: '80 000 руб.',
    imageSrc: '/images/shop/RE5R05A.png',
    imageAlt: 'АКПП RE5R05A',
  },
  {
    id: 'tf80',
    title: 'АКПП TF80',
    description:
      'Устанавливается на следующие марки автомобилей: Alfa Romeo, Cadillac, Citroen, Fiat, Jaguar, Opel, Peugeot, Renault, Saab, Volvo',
    price: '85 000 руб.',
    imageSrc: '/images/shop/TF80.png',
    imageAlt: 'АКПП TF80',
  },
]
</script>

<template>
  <ShopSection :items />
</template>
