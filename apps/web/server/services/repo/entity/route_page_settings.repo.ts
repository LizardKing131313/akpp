import type { RoutePageSettings } from '#shared/types/route-page-settings'

import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class RoutePageSettingsRepository extends SingletonRepository<RoutePageSettings> {
  protected readonly collection = 'route_page_settings'

  protected readonly fields = `
    breadcrumb_home_label,
    breadcrumb_repair_label,
    breadcrumb_services_label,
    breadcrumb_service_label,
    breadcrumb_model_label,
    breadcrumb_brand_label,
    breadcrumb_articles_label,
    breadcrumb_article_label,
    breadcrumb_contacts_label,
    breadcrumb_determine_label,
    breadcrumb_policy_label,
    breadcrumb_sale_label,
    breadcrumb_transmission_label,
    breadcrumb_transmission_item_label,
    breadcrumb_work_label,
    breadcrumb_case_label,
    repair_brand_h1_template,
    repair_brand_seo_title_template,
    repair_brand_seo_description_template,
    repair_brand_content_template,
    repair_model_h1_template,
    repair_model_seo_title_template,
    repair_model_seo_description_template,
    repair_model_content_template,
    service_h1_template,
    service_seo_title_template,
    service_seo_description_template,
    service_content_template,
    service_brand_h1_template,
    service_brand_seo_title_template,
    service_brand_seo_description_template,
    service_brand_content_template
  `
}
