import type { ShopModalSettings } from '#shared/types/modal'

import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class ShopModalRepository extends SingletonRepository<ShopModalSettings> {
  protected readonly collection = 'shop_modal_settings'

  protected readonly fields = `
    title,
    form_aria_label,
    car_label,
    car_placeholder,
    vin_label,
    vin_placeholder,
    phone_label,
    phone_placeholder,
    submit_label
  `
}
