import type { HeaderSettings } from '#shared/types/header'

import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class HeaderRepository extends SingletonRepository<HeaderSettings> {
  protected readonly collection = 'header_settings'

  protected readonly fields = `
    logo_source,
    logo_source_mobile,
    logo_alt,
    logo_href,
    location_icon_source,
    location_icon_alt,
    location_button_aria_label,
    search_icon_source,
    search_icon_alt,
    search_placeholder,
    search_input_aria_label,
    time_icon_source,
    time_icon_alt,
    phone_icon_source,
    phone_icon_alt,
    hero_button_label,
    hero_prev_slide_aria_label,
    hero_next_slide_aria_label,
    breadcrumbs_background_source,
    breadcrumbs_background_alt,
    menu_open_aria_label,
    mobile_menu_aria_label,
    mobile_menu_back_aria_label,
    menu_mobile_logo_source,
    menu_mobile_logo_alt
  `
}
