<script setup lang="ts">
import { MenuNode } from '#shared/types/layout/menu/menu'
import { ref } from 'vue'

import GradientBlock from '~/components/shared/GradientBlock.vue'

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
    <div class="bg-surface-soft relative w-full">
      <div class="relative h-75 w-full overflow-hidden">
        <ClientOnly>
          <YandexMap />
        </ClientOnly>
      </div>

      <div class="relative mx-auto max-w-6xl px-4">
        <div class="absolute inset-x-0 top-full z-10 -translate-y-1/2">
          <div class="bg-surface-soft rounded-full px-4 py-4 shadow-xl lg:px-8 lg:py-5">
            <div class="text-brand-grey flex items-center justify-center text-sm">
              <ContactCard
                iconSource="/images/icons/location.svg"
                iconAlt="email"
                title="akppcenter77@yandex.ru"
                subtitle="Написать письмо"
                linkType="email"
                href="akppcenter77@yandex.ru"
                class="hidden! lg:flex!" />

              <VerticalDivider />

              <ContactCard
                iconSource="/images/icons/phone.svg"
                iconAlt="phone"
                title="+7 499 999 99 99"
                subtitle="Бесплатная консультация"
                linkType="tel"
                href="+74999999999"
                class="flex!" />

              <VerticalDivider />

              <ContactCard
                iconSource="/images/icons/time.svg"
                iconAlt="time"
                title="Пн - Вс 9:00 - 21:00"
                subtitle="Без выходных"
                class="hidden! lg:flex!" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <BrandSlider />

    <div class="bg-brand-dark text-surface-soft relative">
      <GradientBlock>
        <div class="relative mx-auto max-w-6xl px-4 pt-24 pb-8">
          <div class="grid gap-10 md:grid-cols-2">
            <div class="grid md:gap-x-16 lg:grid-cols-[1.5fr_1fr]">
              <div>
                <h3 class="text-surface-soft mb-2 text-2xl font-bold">
                  АКПП<span class="text-brand-red">ЦЕНТР+</span>
                </h3>
                <HorizontalDivider />
                <p class="text-brand-grey-light text-sm">
                  АКППЦЕНТР - профильный сервис по ремонту коробок автомат. Недорого, быстро и с
                  гарантией мы ремонтируем автоматические коробки передач уже более 10 лет.
                </p>
              </div>

              <!-- Menu -->
              <div>
                <h4 class="text-surface-soft mt-8 mb-2 text-2xl font-bold lg:mt-0">Меню</h4>
                <HorizontalDivider />
                <ul class="text-brand-grey-light space-y-1 text-sm">
                  <li v-for="menuItem in menuItems" :key="menuItem.id">
                    <NuxtLink
                      v-if="menuItem.href"
                      :to="menuItem.href"
                      class="hover:text-surface-soft transition">
                      {{ menuItem.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>

            <FooterArticles />

            <div class="text-brand-grey-light pt-4 text-xs">
              Обратите внимание: представленная на данной странице информация, включая стоимость
              услуг, сроки ремонта и условия гарантии, носит информационный характер и не является
              публичной офертой.
            </div>

            <div class="text-brand-grey-light pt-4 text-sm">
              <div>
                Ремонт коробок передач АКПП<span class="text-brand-red">ЦЕНТР+</span> | Все права
                защищены © 2026
              </div>

              <NuxtLink
                to="#"
                class="hover:text-surface-soft mt-2 inline-block underline transition">
                Политика обработки персональных данных
              </NuxtLink>
            </div>
          </div>
        </div>
      </GradientBlock>
    </div>

    <ContactButton pulse />
  </footer>
</template>
