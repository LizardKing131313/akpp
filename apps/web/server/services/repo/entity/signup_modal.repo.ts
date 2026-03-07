import type { SignupModalUiSettings } from '#shared/types/modal'

import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class SignupModalRepository extends SingletonRepository<SignupModalUiSettings> {
  protected readonly collection = 'signup_modal_settings'

  protected readonly fields = `
    title,
    description,
    image_source,
    image_alt,
    form_aria_label,
    name_label,
    name_placeholder,
    submit_label
  `
}
