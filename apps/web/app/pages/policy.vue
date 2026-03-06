<script setup lang="ts">
definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    title: 'Политика конфиденциальности',
    backgroundSrc: '/images/breadcrumbs.jpg',
  },
})

withDefaults(defineProps<{ title?: string; policy?: string; agreement?: string }>(), {
  title: 'Политика конфиденциальности',
  policy:
    'Настоящая политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта.',
  agreement:
    'Пользователь соглашается с обработкой персональных данных при отправке форм на сайте.',
})
</script>

<template>
  <div class="space-y-6">
    <CenteredTitle>{{ title }}</CenteredTitle>

    <div class="text-brand-grey space-y-4 text-base leading-relaxed">
      <p>{{ policy }}</p>

      <p>{{ agreement }}</p>
    </div>
  </div>
</template>
