<script setup lang="ts">
import type { ImageItem, SlugEntityItem } from '#shared/types/entity'

import { cn } from '#shared/lib/cn'

const emit = defineEmits<{
  (event: 'click'): void
}>()

const props = withDefaults(
  defineProps<
    {
      class?: string
      sizes?: string
    } & SlugEntityItem &
      ImageItem
  >(),
  {
    class: '',
    sizes: '96px',
  }
)

const isLink = computed<boolean>(() => Boolean(props.slug))
</script>

<template>
  <component
    :is="isLink ? 'NuxtLink' : 'button'"
    :to="isLink ? slug : undefined"
    type="button"
    @click="!isLink && emit('click')"
    :class="
      cn(`
        group hover:bg-brand-soft/40 focus-visible:ring-brand-red/60 relative
        z-0 flex h-full w-full cursor-pointer flex-col items-center justify-center space-y-4
        rounded-lg p-4 transition-all duration-200 hover:z-10
        hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:outline-none
      `)
    ">
    <div
      :class="
        cn(
          `relative h-12 w-24 transition-transform duration-200 group-hover:scale-[1.06]`,
          props.class
        )
      ">
      <CmsImage
        :src="image_source"
        :alt="image_alt"
        fill
        :sizes="sizes"
        class="absolute inset-0 h-full w-full object-contain" />
    </div>

    <span class="text-brand-dark text-center text-xs font-bold tracking-wide uppercase">
      {{ props.name }}
    </span>
  </component>
</template>
