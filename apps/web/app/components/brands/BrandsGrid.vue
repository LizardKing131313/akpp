<script setup lang="ts">
import { BrandItem } from '#shared/types/components/brand'
import { ItemImage } from '#shared/types/components/image'
import { computed, ref } from 'vue'

interface BrandsGridProps {
  title?: string
  brands?: BrandItem[]
}

const props = withDefaults(defineProps<BrandsGridProps>(), {
  title: 'Выберите марку автомобиля',
  brands: () => [
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
  ],
})

const isExpanded = ref<boolean>(false)
const initialMobileCount = 9

const sectionRef = ref<HTMLElement | null>(null)

const mobileBrands = computed<BrandItem[]>(() => {
  if (isExpanded.value) return props.brands
  return props.brands.slice(0, initialMobileCount)
})

const shouldShowToggleButton = computed<boolean>(() => {
  return props.brands.length > initialMobileCount
})

const toggle = async (): Promise<void> => {
  isExpanded.value = !isExpanded.value

  if (!isExpanded.value) {
    await nextTick()
    sectionRef.value?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}
</script>

<template>
  <section ref="sectionRef" class="w-full">
    <div class="mx-auto max-w-6xl px-4">
      <div
        class="border-brand-grey-light/10 bg-surface-soft rounded-xl border px-4 pt-4 pb-6 shadow-sm sm:px-6">
        <h3 class="text-brand-grey-light/50 text-xs font-semibold tracking-wide uppercase">
          {{ title }}
        </h3>

        <!-- MOBILE -->
        <div class="mt-4 grid grid-cols-3 gap-x-6 gap-y-8 sm:hidden">
          <BrandCard v-for="brand in mobileBrands" :key="brand.id" :brand="brand" />
        </div>

        <div v-if="shouldShowToggleButton" class="mt-6 flex justify-center sm:hidden">
          <button
            type="button"
            class="bg-brand-red text-surface-soft rounded-full px-10 py-3 text-sm font-semibold transition-transform active:scale-[0.98]"
            @click="toggle">
            {{ isExpanded ? 'Свернуть' : 'Показать еще' }}
          </button>
        </div>

        <!-- DESKTOP -->
        <div class="mt-4 hidden grid-cols-4 gap-4 sm:grid md:grid-cols-6 xl:grid-cols-8">
          <BrandCard v-for="brand in brands" :key="brand.id" :brand="brand" />
        </div>
      </div>
    </div>
  </section>
</template>
