<script setup lang="ts">
import { BrandItem, BrandLogo } from '#shared/types/components/brand'

interface BrandsGridProps {
  title?: string
}

withDefaults(defineProps<BrandsGridProps>(), {
  title: 'Выберите марку автомобиля',
})

const brands: BrandItem[] = [
  new BrandItem({
    id: 'audi',
    title: 'Audi',
    href: '/brands/audi',
    logo: new BrandLogo({ source: '/images/brands/audi.png', alt: 'Audi logo' }),
  }),
  new BrandItem({
    id: 'bmw',
    title: 'BMW',
    href: '/brands/bmw',
    logo: new BrandLogo({ source: '/images/brands/bmw.png', alt: 'BMW logo' }),
  }),
  new BrandItem({
    id: 'changan',
    title: 'Changan',
    href: '/brands/changan',
    logo: new BrandLogo({ source: '/images/brands/changan.png', alt: 'Changan logo' }),
  }),
  new BrandItem({
    id: 'chery',
    title: 'Chery',
    href: '/brands/chery',
    logo: new BrandLogo({ source: '/images/brands/chery.png', alt: 'Chery logo' }),
  }),
  new BrandItem({
    id: 'citroen',
    title: 'Citroen',
    href: '/brands/citroen',
    logo: new BrandLogo({ source: '/images/brands/citroen.png', alt: 'Citroen logo' }),
  }),
  new BrandItem({
    id: 'exeed',
    title: 'Exeed',
    href: '/brands/exeed',
    logo: new BrandLogo({ source: '/images/brands/exeed.png', alt: 'Exeed logo' }),
  }),
  new BrandItem({
    id: 'ford',
    title: 'Ford',
    href: '/brands/ford',
    logo: new BrandLogo({ source: '/images/brands/ford.png', alt: 'Ford logo' }),
  }),
  new BrandItem({
    id: 'gac',
    title: 'GAC',
    href: '/brands/gac',
    logo: new BrandLogo({ source: '/images/brands/gac.png', alt: 'GAC logo' }),
  }),
  new BrandItem({
    id: 'geely',
    title: 'Geely',
    href: '/brands/geely',
    logo: new BrandLogo({ source: '/images/brands/geely.png', alt: 'Geely logo' }),
  }),
  new BrandItem({
    id: 'haval',
    title: 'Haval',
    href: '/brands/haval',
    logo: new BrandLogo({ source: '/images/brands/haval.png', alt: 'Haval logo' }),
  }),
  new BrandItem({
    id: 'honda',
    title: 'Honda',
    href: '/brands/honda',
    logo: new BrandLogo({ source: '/images/brands/honda.png', alt: 'Honda logo' }),
  }),
  new BrandItem({
    id: 'hyundai',
    title: 'Hyundai',
    href: '/brands/hyundai',
    logo: new BrandLogo({ source: '/images/brands/hyundai.png', alt: 'Hyundai logo' }),
  }),
  new BrandItem({
    id: 'jaecoo',
    title: 'Jaecoo',
    href: '/brands/jaecoo',
    logo: new BrandLogo({ source: '/images/brands/jaecoo.png', alt: 'Jaecoo logo' }),
  }),
  new BrandItem({
    id: 'jeep',
    title: 'Jeep',
    href: '/brands/jeep',
    logo: new BrandLogo({ source: '/images/brands/jeep.png', alt: 'Jeep logo' }),
  }),
  new BrandItem({
    id: 'kia',
    title: 'KIA',
    href: '/brands/kia',
    logo: new BrandLogo({ source: '/images/brands/kia.png', alt: 'KIA logo' }),
  }),
  new BrandItem({
    id: 'lexus',
    title: 'Lexus',
    href: '/brands/lexus',
    logo: new BrandLogo({ source: '/images/brands/lexus.png', alt: 'Lexus logo' }),
  }),
  new BrandItem({
    id: 'mazda',
    title: 'Mazda',
    href: '/brands/mazda',
    logo: new BrandLogo({ source: '/images/brands/mazda.png', alt: 'Mazda logo' }),
  }),
  new BrandItem({
    id: 'mercedes',
    title: 'Mercedes',
    href: '/brands/mercedes',
    logo: new BrandLogo({ source: '/images/brands/mercedes.png', alt: 'Mercedes logo' }),
  }),
  new BrandItem({
    id: 'mitsubishi',
    title: 'Mitsubishi',
    href: '/brands/mitsubishi',
    logo: new BrandLogo({ source: '/images/brands/mitsubishi.png', alt: 'Mitsubishi logo' }),
  }),
  new BrandItem({
    id: 'nissan',
    title: 'Nissan',
    href: '/brands/nissan',
    logo: new BrandLogo({ source: '/images/brands/nissan.png', alt: 'Nissan logo' }),
  }),
  new BrandItem({
    id: 'omoda',
    title: 'Omoda',
    href: '/brands/omoda',
    logo: new BrandLogo({ source: '/images/brands/omoda.png', alt: 'Omoda logo' }),
  }),
  new BrandItem({
    id: 'opel',
    title: 'Opel',
    href: '/brands/opel',
    logo: new BrandLogo({ source: '/images/brands/opel.png', alt: 'Opel logo' }),
  }),
  new BrandItem({
    id: 'peugeot',
    title: 'Peugeot',
    href: '/brands/peugeot',
    logo: new BrandLogo({ source: '/images/brands/peugeot.png', alt: 'Peugeot logo' }),
  }),
  new BrandItem({
    id: 'renault',
    title: 'Renault',
    href: '/brands/renault',
    logo: new BrandLogo({ source: '/images/brands/renault.png', alt: 'Renault logo' }),
  }),
  new BrandItem({
    id: 'chevrolet',
    title: 'Chevrolet',
    href: '/brands/chevrolet',
    logo: new BrandLogo({ source: '/images/brands/shevrolet.png', alt: 'Chevrolet logo' }),
  }),
  new BrandItem({
    id: 'skoda',
    title: 'Skoda',
    href: '/brands/skoda',
    logo: new BrandLogo({ source: '/images/brands/skoda.png', alt: 'Skoda logo' }),
  }),
  new BrandItem({
    id: 'ssangyong',
    title: 'SsangYong',
    href: '/brands/ssangyong',
    logo: new BrandLogo({ source: '/images/brands/ssangyong.png', alt: 'SsangYong logo' }),
  }),
  new BrandItem({
    id: 'tank',
    title: 'Tank',
    href: '/brands/tank',
    logo: new BrandLogo({ source: '/images/brands/tank.png', alt: 'Tank logo' }),
  }),
  new BrandItem({
    id: 'toyota',
    title: 'Toyota',
    href: '/brands/toyota',
    logo: new BrandLogo({ source: '/images/brands/toyota.png', alt: 'Toyota logo' }),
  }),
  new BrandItem({
    id: 'volkswagen',
    title: 'Volkswagen',
    href: '/brands/volkswagen',
    logo: new BrandLogo({ source: '/images/brands/volkswagen.png', alt: 'Volkswagen logo' }),
  }),
  new BrandItem({
    id: 'volvo',
    title: 'Volvo',
    href: '/brands/volvo',
    logo: new BrandLogo({ source: '/images/brands/volvo.png', alt: 'Volvo logo' }),
  }),
]
</script>

<template>
  <section class="w-full">
    <div class="mx-auto max-w-6xl px-4">
      <div
        class="border-brand-grey-light/10 bg-surface-soft relative overflow-visible rounded-xl border px-4 pt-4 pb-6 shadow-sm sm:px-6">
        <h3 class="text-brand-grey-light/50 text-xs font-semibold tracking-wide uppercase">
          {{ title }}
        </h3>

        <div
          class="relative isolate mt-4 grid gap-3 overflow-visible sm:gap-4"
          style="grid-template-columns: repeat(auto-fit, minmax(120px, 1fr))">
          <BrandCard v-for="brand in brands" :key="brand.id" :brand />
        </div>
      </div>
    </div>
  </section>
</template>
