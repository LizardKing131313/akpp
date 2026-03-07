<script setup lang="ts">
import type { WhySettings } from '#shared/types/why'

import { computed } from 'vue'

definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    breadcrumb: 'Услуга',
    breadcrumbs: [
      { name: 'Главная', slug: '/' },
      { name: 'Услуги', slug: '/uslugi' },
      { name: 'Услуга' },
    ],
  },
})

const value = {} as WhySettings
const route = useRoute()

const serviceTitle = computed<string>(() => {
  const rawSlug = String(route.params.id ?? '').trim()
  if (rawSlug.length === 0) {
    return 'Услуга'
  }

  return rawSlug.replace(/-/g, ' ')
})

useDynamicBreadcrumbs({
  title: serviceTitle,
  baseItems: [
    { name: 'Главная', slug: '/' },
    { name: 'Услуги', slug: '/uslugi' },
  ],
})
</script>

<template>
  <Why v-bind="value" />
  <ModelSlider />
  <RepairQuizBlock />
  <ServiceAndCaseSection />
  <Article>
    adfskfdas';f';sdla 'jasdflk'j dskl kdsjflksdajfsd;kjflksda jflkdsjflk sdjf;lksdjflksdajf
    sdklfj;lsdkjf;lkdjf;lksdjfklsd kldsafj;klasdjf;klsdjf;lksdjflksdklfsd
    klasdfjklsdajfklsdjf;lksdjf;lkjsdlkfjsdklf l;skdaf'sdjfklsdajf';ldsal;'fsda;'lfkds';kjfsda
    asldfj;ksdajf;lkasdjf;lksdjfklsdf'ksdafjk'sda
    ksafjd;ldsafj;lskadjf;lkasdjf;lksdjflksdjklfsdj;afsdkl
    skdlfjsd;alkfj;lsadkjf;lasdkjf;lksdjf;lkasdjf;lkasd klk'dasf;jadsflj;adsfll;ak;fj';lsdjf;lsd
    sdklafj;lsdjfewroiewfovchnkjfiop[dgvlk[sdf kldfsaj;sdljafisdlkhfasdkhfpoi3u20ilkfflkASJ'FKASD
    dasKFJJ;ljfF;LAJFLKSAJF;SALFJKLFANV;KLXN;NLKAFJASKL
    AKSFL;J;ASLJF90832UKLFALK;JFLS;AKJFL;Jadsnckxzl;kjASAS
    JKLASFhASFISALKhfnsanl;ASJFK;LJasflk;asmnflkasjf;lkasjfkLASF
    KL;HJf;lskAJFLKANSFLKMXZLMLKJSAKF'LFJSa';jf'alksjf'aLSFJ';AS
    KLFJLKSADFLKSDJLKCVNXZVLKDZMV.,ZMNVZVKL;ashjflkSAJFLAKSFJAS
    FKLHJHJF;SADJFLKSDFLKAjflk;SDJFK;LSDJF;LSDAJF;LKSJDF;LKSDFAJ;LK
  </Article>
  <FaqAndReviews />
</template>
