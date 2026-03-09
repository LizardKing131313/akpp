import type { QuizApiSettings } from '#shared/types/api/quiz'
import type { QuizSettings } from '#shared/types/quiz'

import { mapQuizApiSettingsToQuizSettings } from '#server/services/repo/mappers/quiz.mapper'
import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class QuizSettingsRepository extends SingletonRepository<QuizApiSettings> {
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
    problem_badge_label,
    symptom_title,
    symptom_badge_label,
    contact_title,
    contact_description,
    contact_auto_label,
    contact_problem_label,
    contact_name_label,
    contact_name_placeholder,
    contact_submit_label,
    success_title,
    success_line_1,
    success_line_2,
    modal_empty_text
  `

  public async getSettings(): Promise<QuizSettings> {
    const apiSettings = await super.get()
    return mapQuizApiSettingsToQuizSettings(apiSettings)
  }
}
