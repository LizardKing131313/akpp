import type { QuizApiSettings } from '#shared/types/api/quiz'
import type { QuizSettings } from '#shared/types/quiz'

const normalizeText = (value: string | null | undefined): string => value?.trim() ?? ''

export const mapQuizApiSettingsToQuizSettings = (apiSettings: QuizApiSettings): QuizSettings => {
  return {
    step_label_brand: normalizeText(apiSettings.step_label_brand),
    step_label_problem: normalizeText(apiSettings.step_label_problem),
    step_label_symptom: normalizeText(apiSettings.step_label_symptom),
    step_label_contact: normalizeText(apiSettings.step_label_contact),
    back_label: normalizeText(apiSettings.back_label),
    options_empty_text: normalizeText(apiSettings.options_empty_text),

    brand_title: normalizeText(apiSettings.brand_title),
    brand_description: normalizeText(apiSettings.brand_description),
    brand_input_placeholder: normalizeText(apiSettings.brand_input_placeholder),
    brand_next_label: normalizeText(apiSettings.brand_next_label),
    brand_popular_label: normalizeText(apiSettings.brand_popular_label),
    brand_empty_label: normalizeText(apiSettings.brand_empty_label),

    problem_title: normalizeText(apiSettings.problem_title),
    problem_badge_label: normalizeText(apiSettings.problem_badge_label),

    symptom_title: normalizeText(apiSettings.symptom_title),
    symptom_badge_label: normalizeText(apiSettings.symptom_badge_label),

    contact_title: normalizeText(apiSettings.contact_title),
    contact_description: normalizeText(apiSettings.contact_description),
    contact_auto_label: normalizeText(apiSettings.contact_auto_label),
    contact_problem_label: normalizeText(apiSettings.contact_problem_label),
    contact_name_label: normalizeText(apiSettings.contact_name_label),
    contact_name_placeholder: normalizeText(apiSettings.contact_name_placeholder),
    contact_submit_label: normalizeText(apiSettings.contact_submit_label),

    success_title: normalizeText(apiSettings.success_title),
    success_line_1: normalizeText(apiSettings.success_line_1),
    success_line_2: normalizeText(apiSettings.success_line_2),

    modal_empty_text: normalizeText(apiSettings.modal_empty_text),
  }
}
