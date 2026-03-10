import type { FooterSettings } from '#shared/types/footer'

import { computed } from 'vue'

import { useFooterSettings } from '~/composables/useRepoApi'

const defaultFooterSettings: FooterSettings = {
  description:
    'АКППЦЕНТР - профильный сервис по ремонту коробок автомат. Недорого, быстро и с гарантией мы ремонтируем автоматические коробки передач уже более 10 лет.',
  offer:
    'Обратите внимание: представленная на данной странице информация, включая стоимость услуг, сроки ремонта и условия гарантии, носит информационный характер и не является публичной офертой.',
  copyright: 'Ремонт коробок передач АКППЦЕНТР+ | Все права защищены © 2026',
  policy: 'Политика обработки персональных данных',
  policy_href: '/policy',
  policy_aria_label: 'Перейти к политике обработки персональных данных',
  title_main: 'АКПП',
  title_accent: 'ЦЕНТР+',
  menu: 'Меню',
  menu_link_aria_label_prefix: 'Перейти в раздел',
  articles: 'Статьи',
  article_link_aria_label_prefix: 'Открыть статью',
  show_all_articles: 'Все статьи',
  show_all_articles_href: '/articles',
  show_all_articles_aria_label: 'Показать все статьи',
  map_height_px: 300,
  contact_email_icon_source: '/images/icons/location.svg',
  contact_email_icon_alt: 'email',
  contact_phone_icon_source: '/images/icons/phone.svg',
  contact_phone_icon_alt: 'phone',
  contact_time_icon_source: '/images/icons/time.svg',
  contact_time_icon_alt: 'time',
  contact_button_icon_source: '/images/icons/telephone.svg',
  contact_button_icon_alt: 'Позвонить',
  contact_button_aria_label: 'Открыть форму записи',
}

export const useFooterUiSettings = () => {
  const { data } = useFooterSettings()

  return computed<FooterSettings>(() => ({
    ...defaultFooterSettings,
    ...(data.value ?? {}),
  }))
}
