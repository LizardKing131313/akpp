import type { ModalWindowsUiSettings } from '#shared/types/modal'

import { computed } from 'vue'

import {
  useCitySelectModalSettings,
  useShopModalSettings,
  useSignupModalSettings,
} from '~/composables/useRepoApi'

const defaultModalWindowsUiSettings: ModalWindowsUiSettings = {
  city_select: {
    title: 'Выбрать город',
    search_placeholder: 'Поиск по городу',
    empty_text: 'Ничего не найдено',
  },
  shop: {
    title: 'Продажа АКПП',
    form_aria_label: 'Продажа АКПП',
    car_label: 'Автомобиль',
    car_placeholder: 'Автомобиль: марка, модель и год выпуска?',
    vin_label: 'VIN',
    vin_placeholder: 'VIN номер автомобиля',
    submit_label: 'Узнать цену',
  },
  signup: {
    title: 'Записаться',
    description:
      'Оставьте заявку на бесплатную консультацию и наши специалисты свяжутся с Вами в самое ближайшее время',
    image_source: '/images/transmission.png',
    image_alt: 'akpp',
    form_aria_label: 'Записаться',
    name_label: 'Имя',
    name_placeholder: 'Как вас зовут?',
    submit_label: 'Оставить заявку',
  },
}

export const useModalWindowsUiSettings = () => {
  const { data: citySelectData } = useCitySelectModalSettings()
  const { data: shopData } = useShopModalSettings()
  const { data: signupData } = useSignupModalSettings()

  return computed<ModalWindowsUiSettings>(() => ({
    city_select: {
      ...defaultModalWindowsUiSettings.city_select,
      ...(citySelectData.value ?? {}),
    },
    shop: {
      ...defaultModalWindowsUiSettings.shop,
      ...(shopData.value ?? {}),
    },
    signup: {
      ...defaultModalWindowsUiSettings.signup,
      ...(signupData.value ?? {}),
    },
  }))
}
