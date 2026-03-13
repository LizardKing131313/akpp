<script setup lang="ts">
import { computed } from 'vue'

import { usePageSeo } from '~/composables/usePageSeo'

const seoTitle = computed<string>(() => 'Ремонт АКПП в Москве, диагностика и продажа АКПП')
const seoDescription = computed<string>(
  () =>
    'Ремонт АКПП, вариаторов и DSG в Москве. Диагностика, эвакуатор, гарантия, продажа АКПП и подбор решения под марку и модель автомобиля.'
)

usePageSeo({
  title: seoTitle,
  description: seoDescription,
  type: 'website',
})
</script>

<template>
  <h1 class="sr-only">{{ seoTitle }}</h1>
  <Hero />
  <Section>
    <BrandsGrid baseHref="remont-akpp-" />
    <ServicesSection />
    <RepairQuizBlock />
    <ServiceAndCaseSection />
    <PerksSection />
    <FaqAndReviews :show-on-homepage="true" />
  </Section>
</template>
