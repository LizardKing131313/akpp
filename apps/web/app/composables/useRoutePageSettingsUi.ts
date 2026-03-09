import type { RoutePageSettings } from '#shared/types/route-page-settings'

import { computed } from 'vue'

const defaultRoutePageSettings: RoutePageSettings = {
  breadcrumb_home_label: 'Главная',
  breadcrumb_repair_label: 'Ремонт АКПП',
  breadcrumb_services_label: 'Услуги',
  breadcrumb_service_label: 'Услуга',
  breadcrumb_model_label: 'Модель',
  breadcrumb_brand_label: 'Марка',
  breadcrumb_articles_label: 'Статьи',
  breadcrumb_article_label: 'Статья',
  breadcrumb_contacts_label: 'Контакты',
  breadcrumb_determine_label: 'Определить АКПП',
  breadcrumb_policy_label: 'Политика конфиденциальности',
  breadcrumb_sale_label: 'Продажа АКПП',
  breadcrumb_transmission_label: 'Трансмиссии',
  breadcrumb_transmission_item_label: 'Трансмиссия',
  breadcrumb_work_label: 'Примеры работ',
  breadcrumb_case_label: 'Пример работы',

  repair_brand_h1_template: 'Ремонт АКПП {brand}',
  repair_brand_seo_title_template: 'Ремонт АКПП {brand}',
  repair_brand_seo_description_template: 'Ремонт АКПП для {brand}.',
  repair_brand_content_template:
    'Страница находится в наполнении. Оставьте заявку, и мы подберем решение под ваш автомобиль.',

  repair_model_h1_template: 'Ремонт АКПП {brand} {model}',
  repair_model_seo_title_template: 'Ремонт АКПП {brand} {model}',
  repair_model_seo_description_template: 'Ремонт АКПП {model} в профильном сервисе.',
  repair_model_content_template:
    'Страница находится в наполнении. Оставьте заявку, и мы подберем решение под ваш автомобиль.',

  service_h1_template: '{service}',
  service_seo_title_template: '{service}',
  service_seo_description_template: 'Услуга {service} для вашего автомобиля.',
  service_content_template:
    'Страница находится в наполнении. Оставьте заявку, и мы поможем подобрать нужную услугу.',

  service_brand_h1_template: '{service} {brand}',
  service_brand_seo_title_template: '{service} {brand}',
  service_brand_seo_description_template: '{service} для {brand}.',
  service_brand_content_template:
    'Страница находится в наполнении. Оставьте заявку, и мы поможем подобрать нужную услугу.',
}

export const useRoutePageSettingsUi = () => {
  const { data } = useRoutePageSettings()

  return computed<RoutePageSettings>(() => ({
    ...defaultRoutePageSettings,
    ...(data.value ?? {}),
  }))
}
