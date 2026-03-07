import type { CalculateSettings } from '#shared/types/calculate'

import { computed } from 'vue'

import { useCalculateSettings } from '~/composables/useRepoApi'

const defaultCalculateSettings: CalculateSettings = {
  title_main: 'Рассчитать стоимость ремонта за',
  title_accent: '1 минуту',
  description: 'Ответьте на 3 вопроса и получите предварительную смету и скидку 10% на работы.',
  perks: [
    'Точность оценки до 90%',
    'Консультация мастера бесплатно',
    'Бронирование времени без очереди',
  ],
}

export const useCalculateUiSettings = () => {
  const { data } = useCalculateSettings()

  return computed<CalculateSettings>(() => {
    const apiSettings = data.value
    const apiPerks = Array.isArray(apiSettings?.perks) ? apiSettings.perks : []

    return {
      ...defaultCalculateSettings,
      ...(apiSettings ?? {}),
      perks: apiPerks.length > 0 ? apiPerks : defaultCalculateSettings.perks,
    }
  })
}
