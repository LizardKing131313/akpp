<script setup lang="ts">
import { ItemImage } from '#shared/types/components/image'
import { HeroSlide } from '#shared/types/layout/hero'

definePageMeta({
  pageHeader: {
    kind: 'hero',
    slides: [
      new HeroSlide({
        id: 'moscow',
        titleAccent: 'Ремонт АКПП',
        titleMain: 'в Москве',
        description:
          'АКПП-ЦЕНТР - профильный сервис по ремонту коробок автомат. Недорого, быстро и с гарантией мы ремонтируем автоматические коробки передач уже более 10 лет!',
        buttonLabel: 'Записаться',
        image: new ItemImage({ source: '/images/hero.jpg', alt: 'Ремонт АКПП' }),
      }),
      new HeroSlide({
        id: 'spb',
        titleAccent: 'Ремонт АКПП',
        titleMain: 'в Питере',
        description:
          'АКПП-ЦЕНТР - профильный сервис по ремонту коробок автомат. Недорого, быстро и с гарантией мы ремонтируем автоматические коробки передач уже более 10 лет!',
        buttonLabel: 'Записаться',
        image: new ItemImage({ source: '/images/hero.jpg', alt: 'Ремонт АКПП' }),
      }),
    ],
  },
})
</script>

<template>
  <BrandsGrid />
  <ServicesSection />
  <RepairQuizBlock />
  <ServiceAndWorksSection />
  <PerksSection />
  <FaqAndReviews />
</template>
