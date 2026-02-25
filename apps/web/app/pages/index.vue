<template>
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
  <div class="p-10">
    <h1 class="text-4xl font-bold">Главная</h1>
  </div>
</template>
