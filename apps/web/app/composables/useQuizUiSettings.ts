import type { QuizSettings } from '#shared/types/quiz'

import { computed } from 'vue'

import { useQuizSettings } from '~/composables/useRepoApi'

const defaultQuizSettings: QuizSettings = {
  step_label_brand: 'МАРКА',
  step_label_problem: 'ПРОБЛЕМА',
  step_label_symptom: 'СИМПТОМЫ',
  step_label_contact: 'РАСЧЕТ',
  back_label: 'Назад',
  options_empty_text: 'Нет вариантов',

  brand_title: 'Укажите марку автомобиля',
  brand_description: 'Введите вручную или выберите из списка популярных',
  brand_input_placeholder: 'Введите марку (например: Dodge)...',
  brand_next_label: 'Далее',
  brand_popular_label: 'Популярные марки:',
  brand_empty_label: 'Ничего не найдено',

  problem_title: 'Что случилось?',
  problem_badge_label: 'Автомобиль:',

  symptom_title: 'Уточните симптомы',
  symptom_badge_label: 'Проблема:',

  contact_title: 'Готово! Получите расчет',
  contact_description: 'Оставьте телефон, мастер уже делает смету.',
  contact_auto_label: 'Авто:',
  contact_problem_label: 'Проблема:',
  contact_name_label: 'Имя',
  contact_name_placeholder: 'Как вас зовут?',
  contact_phone_label: 'Телефон',
  contact_phone_placeholder: '+7 (___) ___-__-__',
  contact_submit_label: 'Узнать стоимость',

  success_title: 'Спасибо!',
  success_line_1: 'Ваши ответы отправлены мастеру.',
  success_line_2: 'Мы свяжемся с вами в ближайшее время для консультации.',

  modal_empty_text: 'Нет данных для квиза',
}

const pickText = (value: string | undefined, fallback: string): string =>
  value?.trim() ? value : fallback

const mergeQuizSettings = (
  defaults: QuizSettings,
  overrides?: Partial<QuizSettings> | null
): QuizSettings =>
  Object.fromEntries(
    Object.entries(defaults).map(([key, fallback]) => [
      key,
      pickText(overrides?.[key as keyof QuizSettings], fallback),
    ])
  ) as QuizSettings

export const useQuizUiSettings = () => {
  const { data } = useQuizSettings()

  return computed<QuizSettings>(() => mergeQuizSettings(defaultQuizSettings, data.value))
}
