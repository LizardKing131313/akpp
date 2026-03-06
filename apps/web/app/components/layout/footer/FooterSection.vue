<script setup lang="ts">
import type { CityItem } from '#shared/types/city'
import type { YandexMapPoint } from '#shared/types/entity'
import type { FooterSettings } from '#shared/types/footer'
import type { LocationItem } from '#shared/types/location'
import type { MenuItem } from '#shared/types/menu'

import { cn } from '#shared/lib/cn'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    settings?: FooterSettings
    city?: CityItem | null
    locations?: LocationItem[]
  }>(),
  {
    settings: () => ({
      description:
        'АКППЦЕНТР - профильный сервис по ремонту коробок автомат. Недорого, быстро и с гарантией мы ремонтируем автоматические коробки передач уже более 10 лет.',
      offer:
        'Обратите внимание: представленная на данной странице информация, включая стоимость услуг, сроки ремонта и условия гарантии, носит информационный характер и не является публичной офертой.',
      copyright: 'Ремонт коробок передач АКППЦЕНТР+ | Все права защищены © 2026',
      policy: 'Политика обработки персональных данных',
      policy_href: '/policy',
      title_main: 'АКПП',
      title_accent: 'ЦЕНТР+',
      menu: 'Меню',
      articles: 'Статьи',
      show_all_articles: 'Все статьи',
      menus: [],
    }),
    city: null,
    locations: () => [],
  }
)

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

const menuItems = computed<readonly MenuItem[]>(() => {
  return props.settings.menus
})

const locations = computed<readonly LocationItem[]>(() => {
  return props.locations
})

const mapPoints = computed<YandexMapPoint[]>(() => {
  return locations.value.map((locationItem) => ({
    id: locationItem.id,
    title: locationItem.name ?? locationItem.address,
    lat: locationItem.lat,
    lng: locationItem.lng,
  }))
})

const mapCenter = computed<[number, number]>(() => {
  const firstLocation = locations.value[0]
  if (firstLocation) {
    return [firstLocation.lng, firstLocation.lat]
  }

  return [37.618423, 55.751244]
})

const mapZoom = computed<number>(() => {
  if (locations.value.length <= 1) {
    return 12
  }

  return 10
})

const emailHref = computed<string>(() => {
  const emailValue = props.city?.email_value?.trim() ?? ''
  return emailValue.length > 0 ? `mailto:${emailValue}` : ''
})

const phoneHref = computed<string>(() => {
  const phoneValue = props.city?.phone_number?.replaceAll(/[^\d+]/g, '') ?? ''
  return phoneValue.length > 0 ? `tel:${phoneValue}` : ''
})

const menuHrefByItem = (menuItem: MenuItem): string => {
  const slugValue = menuItem.slug.trim()

  if (slugValue.length === 0 || slugValue === '/') {
    return '/'
  }

  return slugValue.startsWith('/') ? slugValue : `/${slugValue}`
}
</script>

<template>
  <footer class="w-full">
    <div v-if="!hideContacts" class="relative w-full space-y-12">
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
                :title="props.city?.email_value ?? ''"
                :href="emailHref"
                icon-source="/images/icons/location.svg"
                icon-alt="email"
                :subtitle="props.city?.email_text ?? 'Написать письмо'"
                link-type="email"
                class="hidden lg:flex" />

              <VerticalDivider />

              <ContactCard
                :title="props.city?.phone_number ?? ''"
                :href="phoneHref"
                icon-source="/images/icons/phone.svg"
                icon-alt="phone"
                :subtitle="props.city?.phone_text ?? 'Бесплатная консультация'"
                link-type="tel"
                class="flex" />

              <VerticalDivider />

              <ContactCard
                :title="props.city?.work_hours_text ?? ''"
                :subtitle="props.city?.work_hours_subtext ?? ''"
                icon-source="/images/icons/time.svg"
                icon-alt="time"
                class="hidden lg:flex" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <BrandSlider :class="cn(hideContacts ? 'mt-0' : 'mt-36', 'mb-12')" />

    <div
      class="brand-gradient bg-brand-dark text-brand-grey-light relative space-y-12 px-4 py-12 text-sm">
      <TwoColumns class="relative mx-auto max-w-6xl">
        <TwoColumns>
          <div class="space-y-12">
            <FooterTitle>
              {{ props.settings.title_main
              }}<span class="text-brand-red">{{ props.settings.title_accent }}</span>
            </FooterTitle>

            <p>{{ props.settings.description }}</p>
          </div>

          <div class="space-y-12">
            <FooterTitle>{{ props.settings.menu }}</FooterTitle>

            <ul class="space-y-1">
              <li v-for="menuItem in menuItems" :key="menuItem.id">
                <NuxtLink :to="menuHrefByItem(menuItem)" class="hover:text-brand-soft transition">
                  {{ menuItem.name ?? '' }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </TwoColumns>

        <FooterArticles />
      </TwoColumns>

      <TwoColumns class="relative mx-auto max-w-6xl">
        <p>{{ props.settings.offer }}</p>

        <div>
          <p>{{ props.settings.copyright }}</p>

          <NuxtLink
            :to="props.settings.policy_href"
            class="hover:text-brand-white inline-block underline transition">
            {{ props.settings.policy }}
          </NuxtLink>
        </div>
      </TwoColumns>
    </div>

    <ContactButton pulse />
  </footer>
</template>
