<script setup lang="ts">
import { BreadcrumbItem } from '#shared/types/layout/breadcrumb'

definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    title: 'Услуги',
    backgroundSrc: '/images/breadcrumbs.jpg',
    items: [
      new BreadcrumbItem({ label: 'Главная', to: '/' }),
      new BreadcrumbItem({ label: 'Услуги', to: '/services' }),
    ],
  },
})
</script>

<template>
  <BrandsGrid />
  <RepairQuizBlock />
  <ServiceAndWorksSection />
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
