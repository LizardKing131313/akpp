import type { SignupModalSettings } from '#shared/types/modal'

import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class SignupModalRepository extends SingletonRepository<SignupModalSettings> {
  protected readonly collection = 'signup_modal_settings'

  protected readonly fields = `
    title,
    description,
    image_source,
    image_alt,
    form_aria_label,
    name_label,
    name_placeholder,
    phone_label,
    phone_placeholder,
    submit_label
  `
}
