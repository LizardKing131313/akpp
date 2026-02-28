<script setup lang="ts">
import type { CityItem } from '#shared/types/components/city'
import type { ContactLocation } from '#shared/types/components/location'
import type { MapPoint } from '#shared/types/components/map'

import { getCities } from '#server/api/city/city.get'
import { getLocations } from '#server/api/contacts/contacts.get'
import { cn } from '#shared/lib/cn'
import { MenuNode } from '#shared/types/layout/menu/menu'
import { computed, ref } from 'vue'

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

const route = useRoute()

type FooterMeta = {
  hideContacts?: boolean
}

type RouteMeta = {
  footer?: FooterMeta
}

const hideContacts = computed<boolean>(() => {
  const meta = route.meta as RouteMeta
  return meta.footer?.hideContacts === true
})

const cities: CityItem[] = getCities()

const allLocations: ContactLocation[] = getLocations()

const selectedCityId = ref<string>(cities[0]?.id ?? '')

const filteredLocations = computed<ContactLocation[]>(() => {
  return allLocations.filter((locationItem) => locationItem.cityId === selectedCityId.value)
})

const mapPoints = computed<MapPoint[]>(() => {
  return filteredLocations.value.map((locationItem) => {
    return {
      id: locationItem.id,
      title: locationItem.title,
      lng: locationItem.lng,
      lat: locationItem.lat,
    }
  })
})

const mapCenter = computed<[number, number]>(() => {
  const firstLocation = filteredLocations.value[0]
  if (firstLocation) return [firstLocation.lng, firstLocation.lat]
  return [37.618423, 55.751244]
})

const mapZoom = computed<number>(() => {
  const countLocations = filteredLocations.value.length
  if (countLocations <= 1) return 12
  return 10
})
</script>

<template>
  <footer class="w-full">
    <div class="relative w-full space-y-12" v-if="!hideContacts">
      <div class="relative h-75 w-full overflow-hidden">
        <ClientOnly>
          <YandexMap :locations="mapPoints" :center="mapCenter" :zoom="mapZoom" :height-px="300" />
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

    <BrandSlider :class="cn(hideContacts ? 'mt-0' : 'mt-36', 'mb-12')" />

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
