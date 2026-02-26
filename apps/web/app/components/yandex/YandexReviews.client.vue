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
  <div class="w-full overflow-hidden rounded-xl">
    <iframe
      :src="widgetUrl"
      title="Отзывы"
      class="w-full"
      :style="{
        height: props.height + 'px',
        border: '1px solid #e6e6e6',
        borderRadius: '12px',
        boxSizing: 'border-box',
      }"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade" />
  </div>
</template>
