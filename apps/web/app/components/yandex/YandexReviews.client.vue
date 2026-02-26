<script setup lang="ts">
interface YandexReviewsWidgetProps {
  orgId: string
  height?: number
}

const props = withDefaults(defineProps<YandexReviewsWidgetProps>(), {
  height: 600,
})

const widgetUrl = computed(() => {
  return `https://yandex.ru/maps-reviews-widget/${props.orgId}?comments`
})
</script>

<template>
  <div class="w-full overflow-hidden">
    <iframe
      :src="widgetUrl"
      title="Отзывы"
      class="border-brand-grey-light/30 w-full rounded-xl border"
      :style="{ height: props.height + 'px' }"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade" />
  </div>
</template>
