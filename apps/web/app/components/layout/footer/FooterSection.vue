<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { MenuNode } from '#shared/types/layout/menu/menu'
import { ref } from 'vue'

const menuItems = ref<MenuNode[]>([
  new MenuNode({
    id: '1',
    title: 'Главная',
    href: '/',
  }),
  new MenuNode({
    id: '2',
    title: 'Определить АКПП',
    href: '/',
  }),
  new MenuNode({
    id: '3',
    title: 'Коробки передач',
    href: '/',
  }),
  new MenuNode({
    id: '4',
    title: 'Полезные статьи',
    href: '/',
  }),
  new MenuNode({
    id: '5',
    title: 'Контакты',
    href: '/',
  }),
  new MenuNode({
    id: '6',
    title: 'Ремонт вариаторов',
    href: '/',
  }),
  new MenuNode({
    id: '7',
    title: 'Ремонт DSG',
    href: '/',
  }),
  new MenuNode({
    id: '8',
    title: 'Ремонт гидроблока',
    href: '/',
  }),
  new MenuNode({
    id: '9',
    title: 'Диагностика АКПП',
    href: '/',
  }),
  new MenuNode({
    id: '10',
    title: 'Замена масла в АКПП',
    href: '/',
  }),
])
</script>

<template>
  <footer class="w-full">
    <div class="relative w-full space-y-12">
      <div class="relative h-75 w-full overflow-hidden">
        <ClientOnly>
          <YandexMap />
        </ClientOnly>
      </div>

      <div class="relative mx-auto max-w-6xl px-4">
        <div class="absolute inset-x-0 top-full z-10 -translate-y-1/2">
          <div class="bg-brand-white rounded-full px-4 py-4 shadow-xl lg:px-8 lg:py-4">
            <div class="text-brand-grey flex items-center justify-center text-sm">
              <ContactCard
                iconSource="/images/icons/location.svg"
                iconAlt="email"
                title="akppcenter77@yandex.ru"
                subtitle="Написать письмо"
                linkType="email"
                href="akppcenter77@yandex.ru"
                class="hidden lg:flex" />

              <VerticalDivider />

              <ContactCard
                iconSource="/images/icons/phone.svg"
                iconAlt="phone"
                title="+7 499 999 99 99"
                subtitle="Бесплатная консультация"
                linkType="tel"
                href="+74999999999"
                class="flex" />

              <VerticalDivider />

              <ContactCard
                iconSource="/images/icons/time.svg"
                iconAlt="time"
                title="Пн - Вс 9:00 - 21:00"
                subtitle="Без выходных"
                class="hidden lg:flex" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <BrandSlider class="mt-24 mb-12" />

    <div
      :class="
        cn(
          `
            absolute inset-0
            bg-[radial-gradient(ellipse_80%_100%_at_center,#3C3C3C_0%,#222222_100%)]
            md:bg-[radial-gradient(ellipse_40%_100%_at_center,#3C3C3C_0%,#222222_100%)]
          `,
          'bg-brand-dark text-brand-grey-light relative space-y-12 px-4 py-12 text-sm'
        )
      ">
      <TwoColumns class="relative mx-auto max-w-6xl">
        <TwoColumns>
          <div class="space-y-12">
            <FooterTitle>АКПП<span class="text-brand-red">ЦЕНТР+</span></FooterTitle>
            <p>
              АКППЦЕНТР - профильный сервис по ремонту коробок автомат. Недорого, быстро и с
              гарантией мы ремонтируем автоматические коробки передач уже более 10 лет.
            </p>
          </div>

          <div class="space-y-12">
            <FooterTitle>Меню</FooterTitle>
            <ul class="space-y-1">
              <li v-for="menuItem in menuItems" :key="menuItem.id">
                <NuxtLink
                  v-if="menuItem.href"
                  :to="menuItem.href"
                  class="hover:text-brand-soft transition">
                  {{ menuItem.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </TwoColumns>

        <FooterArticles />
      </TwoColumns>

      <TwoColumns class="relative mx-auto max-w-6xl">
        <p>
          Обратите внимание: представленная на данной странице информация, включая стоимость услуг,
          сроки ремонта и условия гарантии, носит информационный характер и не является публичной
          офертой.
        </p>

        <div>
          <p>
            Ремонт коробок передач АКПП<span class="text-brand-red">ЦЕНТР+</span> | Все права
            защищены © 2026
          </p>

          <NuxtLink to="#" class="hover:text-brand-white inline-block underline transition">
            Политика обработки персональных данных
          </NuxtLink>
        </div>
      </TwoColumns>
    </div>

    <ContactButton pulse />
  </footer>
</template>
