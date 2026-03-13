<script setup lang="ts">
import { cn } from '#shared/lib/cn'

const props = withDefaults(
  defineProps<{
    name: string
    image_source: string
    image_alt?: string | undefined
    class?: string
    sizes?: string
  }>(),
  {
    class: '',
    sizes: '96px',
  }
)
</script>

<template>
  <div
    :class="
      cn(
        `relative h-12 w-24 transition-transform duration-200 group-hover:scale-[1.06]`,
        props.class
      )
    ">
    <CmsImage
      :src="props.image_source"
      :alt="`Slider item ${props.image_alt ?? props.name}`"
      fill
      :sizes="props.sizes"
      class="absolute inset-0 h-full w-full object-contain" />
  </div>

  <span class="text-brand-dark text-center text-xs font-bold tracking-wide uppercase">
    {{ props.name }}
  </span>
</template>
