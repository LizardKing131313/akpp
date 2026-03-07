import type { WhySettings } from '#shared/types/why'

import { computed } from 'vue'

import { useWhySettings } from '~/composables/useRepoApi'

type ResolvedWhySettings = Required<WhySettings>

const defaultWhySettings: ResolvedWhySettings = {
  title: 'Почему клиенты выбирают нас',
  description: 'даже рассмотрев все предложения на рынке',
  image_source: '/images/transmission.png',
  image_alt: 'transmission',
  diagnostic: 'Диагностика за 15 минут!',
  diagnostic_image: '/images/perks/car.svg',
  diagnostic_alt: 'diagnostic',
  tow: 'Бесплатный эвакуатор!',
  tow_image: '/images/perks/truck.svg',
  tow_alt: 'truck',
  guarantee: 'Гарантия сроком на 1 год!',
  guarantee_image: '/images/perks/float.svg',
  guarantee_alt: 'float',
  calculateLabel: 'Рассчитать стоимость',
  signupLabel: 'Записаться',
}

export const useWhyUiSettings = () => {
  const { data } = useWhySettings()

  return computed<ResolvedWhySettings>(
    () =>
      ({
        ...defaultWhySettings,
        ...(data.value ?? {}),
      }) as ResolvedWhySettings
  )
}
