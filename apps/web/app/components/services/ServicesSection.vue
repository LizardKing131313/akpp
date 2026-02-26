<script setup lang="ts">
import { ItemImage } from '#shared/types/components/image'
import { ServiceItem } from '#shared/types/components/service'

const services: ServiceItem[] = [
  new ServiceItem({
    id: 'robots',
    title: 'Ремонт роботов',
    href: '/services/robot',
    colspan: 1,
    logo: new ItemImage({
      source: '/images/services/robot.png',
      alt: 'Ремонт роботизированных коробок передач',
    }),
  }),

  new ServiceItem({
    id: 'cvt',
    title: 'Ремонт CVT',
    href: '/services/cvt',
    colspan: 1,
    logo: new ItemImage({
      source: '/images/services/cvt.png',
      alt: 'Ремонт вариатора CVT',
    }),
  }),

  new ServiceItem({
    id: 'dsg',
    title: 'Ремонт DSG',
    href: '/services/dsg',
    colspan: 1,
    logo: new ItemImage({
      source: '/images/services/dsg.png',
      alt: 'Ремонт коробки DSG',
    }),
  }),

  new ServiceItem({
    id: 'powershift',
    title: 'Ремонт Powershift',
    href: '/services/powershift',
    colspan: 2,
    logo: new ItemImage({
      source: '/images/services/powershift.png',
      alt: 'Ремонт коробки Powershift',
    }),
  }),

  new ServiceItem({
    id: 'diagnostics',
    title: 'Бесплатная диагностика АКПП',
    href: '/services/diagnostics',
    colspan: 2,
    logo: new ItemImage({
      source: '/images/services/diagnostics.png',
      alt: 'Диагностика АКПП',
    }),
  }),

  new ServiceItem({
    id: 'torque-converter',
    title: 'Ремонт бублика',
    href: '/services/torque-converter',
    colspan: 1,
    logo: new ItemImage({
      source: '/images/services/donut.png',
      alt: 'Ремонт гидротрансформатора',
    }),
  }),

  new ServiceItem({
    id: 'valve-body',
    title: 'Гидроблок',
    href: '/services/valve-body',
    colspan: 1,
    logo: new ItemImage({
      source: '/images/services/hydro_block.png',
      alt: 'Ремонт гидроблока',
    }),
  }),

  new ServiceItem({
    id: 'oil',
    title: 'Замена масла',
    href: '/services/oil',
    colspan: 1,
    logo: new ItemImage({
      source: '/images/services/oil.png',
      alt: 'Замена масла в АКПП',
    }),
  }),
]
</script>

<template>
  <section class="bg-surface-base py-14">
    <div class="mx-auto max-w-6xl px-4">
      <h2 class="text-brand-dark mb-8 text-center text-3xl font-extrabold">Наши услуги</h2>

      <div class="grid grid-cols-2 gap-6 lg:grid-cols-5">
        <ServiceCard v-for="service in services" :key="service.id" :service />
      </div>
    </div>
  </section>
</template>
