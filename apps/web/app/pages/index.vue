<script setup lang="ts"></script>
<template>
  <div>
    <Hero
      :slides="[
        {
          id: 'moscow',
          titleAccent: 'Ремонт АКПП',
          titleMain: 'в Москве',
          description:
            'АКПП-ЦЕНТР - профильный сервис по ремонту коробок автомат. Недорого, быстро и с гарантией мы ремонтируем автоматические коробки передач уже более 10 лет!',
          buttonLabel: 'Записаться',
          buttonTo: '/contacts',
          imageSrc: '/images/hero.jpg',
          imageAlt: 'Ремонт АКПП',
        },
        {
          id: 'sbp',
          titleAccent: 'Ремонт АКПП',
          titleMain: 'в Питере',
          description:
            'АКПП-ЦЕНТР - профильный сервис по ремонту коробок автомат. Недорого, быстро и с гарантией мы ремонтируем автоматические коробки передач уже более 10 лет!',
          buttonLabel: 'Записаться',
          buttonTo: '/contacts',
          imageSrc: '/images/hero.jpg',
          imageAlt: 'Ремонт АКПП',
        },
      ]" />
    <Breadcrumbs
      title="Ремонт АКПП Хендай"
      backgroundSrc="/images/breadcrumbs.jpg"
      :items="[
        {
          label: 'Главная',
          to: '/',
        },
        { label: 'Hyundai', to: '/remont-akpp/hyundai' },
      ]" />
    <BrandsGrid class="mt-8 mb-8" />
    <ServicesSection class="mt-8 mb-8" />
    <ServiceAndWorksSection class="mt-8 mb-8" />
    <PerksSection class="mt-8 mb-8" />
  </div>
</template>
