<script setup lang="ts">
import { useSimplePagePresentation } from '~/composables/useSimplePagePresentation'

const props = withDefaults(
  defineProps<{
    title: string
    content: string
    description?: string
    showHeading?: boolean
  }>(),
  {
    showHeading: true,
  }
)

useSimplePagePresentation({
  title: () => props.title,
  description: () => props.description ?? props.title,
  baseItems: () => [{ name: 'Главная', slug: '/' }],
})
</script>

<template>
  <div class="space-y-6">
    <CenteredTitle v-if="showHeading">{{ title }}</CenteredTitle>

    <Article>
      <div v-html="content" />
    </Article>
  </div>
</template>
