export type QuizApiResponse = {
  readonly problems: readonly string[]
  readonly symptoms: Readonly<Record<string, readonly string[]>>
}

export type QuizApiSettings = {
  readonly step_label_brand?: string | null
  readonly step_label_problem?: string | null
  readonly step_label_symptom?: string | null
  readonly step_label_contact?: string | null
  readonly back_label?: string | null
  readonly options_empty_text?: string | null

  readonly brand_title?: string | null
  readonly brand_description?: string | null
  readonly brand_input_placeholder?: string | null
  readonly brand_next_label?: string | null
  readonly brand_popular_label?: string | null
  readonly brand_empty_label?: string | null

  readonly problem_title?: string | null
  readonly problem_badge_label?: string | null

  readonly symptom_title?: string | null
  readonly symptom_badge_label?: string | null

  readonly contact_title?: string | null
  readonly contact_description?: string | null
  readonly contact_auto_label?: string | null
  readonly contact_problem_label?: string | null
  readonly contact_name_label?: string | null
  readonly contact_name_placeholder?: string | null
  readonly contact_phone_label?: string | null
  readonly contact_phone_placeholder?: string | null
  readonly contact_submit_label?: string | null

  readonly success_title?: string | null
  readonly success_line_1?: string | null
  readonly success_line_2?: string | null

  readonly modal_empty_text?: string | null
}
