<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const routePageSettings = useRoutePageSettingsUi()

const brandSlug = computed<string>(() => String(route.params.brand ?? '').trim())
const transmissionTitle = computed<string>(() => {
  const rawSlug = String(route.params.id ?? '').trim()
  if (rawSlug.length === 0) {
    return routePageSettings.value.breadcrumb_transmission_item_label
  }

  return rawSlug.replace(/-/g, ' ')
})

usePageEntityBreadcrumbs({
  title: transmissionTitle,
  baseItems: computed(() => {
    const brandPath =
      brandSlug.value.length > 0 ? `/transmission/${brandSlug.value}` : '/transmission'

    return [
      { name: routePageSettings.value.breadcrumb_home_label, slug: '/' },
      { name: routePageSettings.value.breadcrumb_transmission_label, slug: '/transmission' },
      { name: routePageSettings.value.breadcrumb_brand_label, slug: brandPath },
    ]
  }),
})
</script>

<template>
  <Why />
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
