import type { QuizSettings } from '#shared/types/quiz'

import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class QuizSettingsRepository extends SingletonRepository<QuizSettings> {
  protected readonly collection = 'quiz_settings'

  protected readonly fields = `
    step_label_brand,
    step_label_problem,
    step_label_symptom,
    step_label_contact,
    back_label,
    options_empty_text,
    brand_title,
    brand_description,
    brand_input_placeholder,
    brand_next_label,
    brand_popular_label,
    brand_empty_label,
    problem_title,
    problem_description,
    problem_badge_label,
    symptom_title,
    symptom_badge_label,
    symptom_custom_label,
    symptom_custom_placeholder,
    symptom_custom_button,
    context_label,
    context_custom_label,
    context_custom_placeholder,
    context_next_button,
    contact_title,
    contact_description,
    contact_auto_label,
    contact_problem_label,
    contact_name_label,
    contact_name_placeholder,
    contact_phone_label,
    contact_phone_placeholder,
    contact_submit_label,
    success_title,
    success_line_1,
    success_line_2,
    modal_empty_text,
  `
}
