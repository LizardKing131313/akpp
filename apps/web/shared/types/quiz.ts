import type { EntityItem } from '#shared/types/entity'

export type QuizProblemItem = EntityItem & {
  readonly brand_id?: string
}

export type QuizSymptomItem = EntityItem & {
  readonly problem_id?: string
}

export type QuizSettings = {
  readonly step_label_brand: string
  readonly step_label_problem: string
  readonly step_label_symptom: string
  readonly step_label_contact: string
  readonly back_label: string
  readonly options_empty_text: string

  readonly brand_title: string
  readonly brand_description: string
  readonly brand_input_placeholder: string
  readonly brand_next_label: string
  readonly brand_popular_label: string
  readonly brand_empty_label: string

  readonly problem_title: string
  readonly problem_badge_label: string

  readonly symptom_title: string
  readonly symptom_badge_label: string

  readonly contact_title: string
  readonly contact_description: string
  readonly contact_auto_label: string
  readonly contact_problem_label: string
  readonly contact_name_label: string
  readonly contact_name_placeholder: string
  readonly contact_phone_label: string
  readonly contact_phone_placeholder: string
  readonly contact_submit_label: string

  readonly success_title: string
  readonly success_line_1: string
  readonly success_line_2: string

  readonly modal_empty_text: string
}

export type QuizSubmitPayload = {
  readonly brandTitle: string
  readonly problemTitle: string
  readonly symptomTitle: string
  readonly customerName: string
  readonly customerPhone: string
}
