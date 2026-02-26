<script setup lang="ts">
import { computed } from 'vue'

interface YandexReviewsWidgetProps {
  orgId: string
}

const props = defineProps<YandexReviewsWidgetProps>()

const widgetUrl = computed(() => {
  return `https://yandex.ru/maps-reviews-widget/${props.orgId}?comments`
})
</script>

<template>
  <div class="h-full w-full overflow-hidden">
    <iframe
      :src="widgetUrl"
      title="Отзывы"
      class="border-brand-grey-light/30 h-full w-full rounded-xl border"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade" />
  </div>
</template>
