import type { HeaderSettings } from '#shared/types/header'

import { computed } from 'vue'

const defaultHeaderSettings: HeaderSettings = {
  logo_source: '/images/logo/logo.svg',
  logo_source_mobile: '/images/logo/logo_mobile.svg',
  logo_alt: 'АКППЦЕНТР+',
  logo_href: '/',
  location_icon_source: '/images/icons/location.svg',
  location_icon_alt: 'location',
  location_button_aria_label: 'Выбрать город',
  search_icon_source: '/images/icons/search.svg',
  search_icon_alt: 'search',
  search_placeholder: 'Поиск',
  search_input_aria_label: 'Поиск по сайту',
  time_icon_source: '/images/icons/time.svg',
  time_icon_alt: 'time',
  phone_icon_source: '/images/icons/phone.svg',
  phone_icon_alt: 'phone',
  hero_button_label: 'Записаться',
  hero_button_aria_label: 'Записаться',
  hero_prev_slide_aria_label: 'Previous slide',
  hero_next_slide_aria_label: 'Next slide',
  breadcrumbs_background_source: '/images/breadcrumbs.jpg',
  breadcrumbs_background_alt: 'breadcrumbs background',
  menu_open_aria_label: 'Открыть меню',
  mobile_menu_aria_label: 'Меню',
  mobile_menu_back_aria_label: 'Назад',
  mobile_menu_open_section_aria_prefix: 'Открыть раздел',
  mobile_menu_select_item_aria_prefix: 'Выбрать пункт',
  menu_mobile_logo_source: '/images/logo/logo_menu.svg',
  menu_mobile_logo_alt: 'menu logo',
}

export const useHeaderUiSettings = () => {
  const { data } = useHeaderSettings()

  return computed<HeaderSettings>(() => ({
    ...defaultHeaderSettings,
    ...(data.value ?? {}),
  }))
}
