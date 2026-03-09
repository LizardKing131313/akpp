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
  contact_submit_label: 'Узнать стоимость',

  success_title: 'Спасибо!',
  success_line_1: 'Ваши ответы отправлены мастеру.',
  success_line_2: 'Мы свяжемся с вами в ближайшее время для консультации.',

  modal_empty_text: 'Нет данных для квиза',
}

export const useQuizUiSettings = () => {
  const { data } = useQuizSettings()

  return computed<QuizSettings>(() => {
    const apiSettings = data.value

    if (!apiSettings) {
      return defaultQuizSettings
    }

    const pickText = (value: string, fallback: string): string =>
      value.trim().length > 0 ? value : fallback

    return {
      step_label_brand: pickText(
        apiSettings.step_label_brand,
        defaultQuizSettings.step_label_brand
      ),
      step_label_problem: pickText(
        apiSettings.step_label_problem,
        defaultQuizSettings.step_label_problem
      ),
      step_label_symptom: pickText(
        apiSettings.step_label_symptom,
        defaultQuizSettings.step_label_symptom
      ),
      step_label_contact: pickText(
        apiSettings.step_label_contact,
        defaultQuizSettings.step_label_contact
      ),
      back_label: pickText(apiSettings.back_label, defaultQuizSettings.back_label),
      options_empty_text: pickText(
        apiSettings.options_empty_text,
        defaultQuizSettings.options_empty_text
      ),
      brand_title: pickText(apiSettings.brand_title, defaultQuizSettings.brand_title),
      brand_description: pickText(
        apiSettings.brand_description,
        defaultQuizSettings.brand_description
      ),
      brand_input_placeholder: pickText(
        apiSettings.brand_input_placeholder,
        defaultQuizSettings.brand_input_placeholder
      ),
      brand_next_label: pickText(
        apiSettings.brand_next_label,
        defaultQuizSettings.brand_next_label
      ),
      brand_popular_label: pickText(
        apiSettings.brand_popular_label,
        defaultQuizSettings.brand_popular_label
      ),
      brand_empty_label: pickText(
        apiSettings.brand_empty_label,
        defaultQuizSettings.brand_empty_label
      ),
      problem_title: pickText(apiSettings.problem_title, defaultQuizSettings.problem_title),
      problem_badge_label: pickText(
        apiSettings.problem_badge_label,
        defaultQuizSettings.problem_badge_label
      ),
      symptom_title: pickText(apiSettings.symptom_title, defaultQuizSettings.symptom_title),
      symptom_badge_label: pickText(
        apiSettings.symptom_badge_label,
        defaultQuizSettings.symptom_badge_label
      ),
      contact_title: pickText(apiSettings.contact_title, defaultQuizSettings.contact_title),
      contact_description: pickText(
        apiSettings.contact_description,
        defaultQuizSettings.contact_description
      ),
      contact_auto_label: pickText(
        apiSettings.contact_auto_label,
        defaultQuizSettings.contact_auto_label
      ),
      contact_problem_label: pickText(
        apiSettings.contact_problem_label,
        defaultQuizSettings.contact_problem_label
      ),
      contact_name_label: pickText(
        apiSettings.contact_name_label,
        defaultQuizSettings.contact_name_label
      ),
      contact_name_placeholder: pickText(
        apiSettings.contact_name_placeholder,
        defaultQuizSettings.contact_name_placeholder
      ),
      contact_submit_label: pickText(
        apiSettings.contact_submit_label,
        defaultQuizSettings.contact_submit_label
      ),
      success_title: pickText(apiSettings.success_title, defaultQuizSettings.success_title),
      success_line_1: pickText(apiSettings.success_line_1, defaultQuizSettings.success_line_1),
      success_line_2: pickText(apiSettings.success_line_2, defaultQuizSettings.success_line_2),
      modal_empty_text: pickText(
        apiSettings.modal_empty_text,
        defaultQuizSettings.modal_empty_text
      ),
    }
  })
}
