<script setup lang="ts">
import type { CityItem } from '#shared/types/city'
import type { YandexMapPoint } from '#shared/types/entity'
import type { FooterSettings } from '#shared/types/footer'
import type { LocationItem } from '#shared/types/location'
import type { MenuItem } from '#shared/types/menu'

import { cn } from '#shared/lib/cn'
import { normalizeAppPath } from '#shared/lib/route'
import { computed } from 'vue'

import BrandSlider from '~/components/brands/BrandSlider.vue'
import YandexMap from '~/components/yandex/YandexMap.client.vue'
import { useActiveCity } from '~/composables/useActiveCity'
import { useFooterSettings, useLocations, useMenus } from '~/composables/useRepoApi'
const activeCity = useActiveCity()
const cityId = computed<string | undefined>(() => activeCity.value?.id)

const { data: locationsData } = useLocations(cityId)

const { data: settingsData } = await useFooterSettings()
const settings = computed<FooterSettings>(() => settingsData.value ?? ({} as FooterSettings))

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

const city = computed<CityItem | null>(() => activeCity.value ?? null)

const { data: menusData } = useMenus('footer')
const menuItems = computed<MenuItem[]>(() => menusData.value ?? [])

const locations = computed<readonly LocationItem[]>(() => {
  return locationsData.value ?? []
})

const mapPoints = computed<YandexMapPoint[]>(() => {
  return locations.value.map((locationItem) => ({
    id: locationItem.id,
    name: locationItem.name ?? locationItem.address,
    address: locationItem.address,
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

const menuHrefByItem = (menuItem: MenuItem): string => {
  return normalizeAppPath(menuItem.slug)
}
</script>

<template>
  <footer class="w-full">
    <div v-if="!hideContacts" class="relative w-full space-y-12">
      <div
        :class="
          cn(
            'relative w-full overflow-visible',
            settings.map_height_px ? `h-[${settings.map_height_px}px]` : 'h-75'
          )
        ">
        <div class="relative h-full w-full overflow-hidden">
          <ClientOnly>
            <YandexMap
              :locations="mapPoints"
              :center="mapCenter"
              :zoom="mapZoom"
              :height-px="settings.map_height_px" />
          </ClientOnly>
        </div>
        <div class="absolute inset-x-4 bottom-0 z-10 mx-auto translate-y-1/2 lg:max-w-6xl">
          <div class="bg-brand-white rounded-full px-4 py-4 shadow-xl lg:px-8 lg:py-4">
            <div class="text-brand-grey flex items-center justify-center text-sm">
              <ContactCard
                :title="city?.email_value ?? ''"
                :href="city?.email_value"
                :icon-source="settings.contact_email_icon_source"
                :icon-alt="settings.contact_email_icon_alt"
                :subtitle="city?.email_text"
                link-type="email"
                class="hidden lg:flex" />

              <VerticalDivider />

              <ContactCard
                :title="city?.phone_number ?? ''"
                :href="city?.phone_number"
                :icon-source="settings.contact_phone_icon_source"
                :icon-alt="settings.contact_phone_icon_alt"
                :subtitle="city?.phone_text"
                link-type="tel"
                class="flex" />

              <VerticalDivider />

              <ContactCard
                :title="city?.work_hours_text ?? ''"
                :subtitle="city?.work_hours_subtext ?? ''"
                :icon-source="settings.contact_time_icon_source"
                :icon-alt="settings.contact_time_icon_alt"
                class="hidden lg:flex" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <BrandSlider :class="cn(hideContacts ? 'mt-0' : 'mt-18', 'mb-12')" />

    <div
      class="brand-gradient bg-brand-dark text-brand-grey-light relative space-y-12 px-4 py-12 text-sm">
      <TwoColumns class="relative mx-auto max-w-6xl">
        <TwoColumns>
          <div class="space-y-12">
            <FooterTitle>
              {{ settings.title_main
              }}<span class="text-brand-red">{{ settings.title_accent }}</span>
            </FooterTitle>

            <p>{{ settings.description }}</p>
          </div>

          <div class="space-y-12">
            <FooterTitle>{{ settings.menu }}</FooterTitle>

            <ul class="space-y-1">
              <li v-for="menuItem in menuItems" :key="menuItem.id">
                <NuxtLink :to="menuHrefByItem(menuItem)" class="hover:text-brand-soft transition">
                  {{ menuItem.name ?? '' }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </TwoColumns>

        <div />
      </TwoColumns>

      <TwoColumns class="relative mx-auto max-w-6xl">
        <p>{{ settings.offer }}</p>

        <div>
          <p>{{ settings.copyright }}</p>

          <NuxtLink
            :to="normalizeAppPath(settings.policy_href)"
            class="hover:text-brand-white inline-block underline transition">
            {{ settings.policy }}
          </NuxtLink>
        </div>
      </TwoColumns>
    </div>

    <ContactButton pulse />
  </footer>
</template>
