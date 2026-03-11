<script setup lang="ts">
import type { ImageItem, NamedEntityItem } from '#shared/types/entity'
import type { RouteLocationRaw } from 'vue-router'

import { cn } from '#shared/lib/cn'

const emit = defineEmits<{
  (event: 'click'): void
}>()

const props = withDefaults(
  defineProps<
    {
      to?: RouteLocationRaw
      class?: string
      sizes?: string
    } & NamedEntityItem &
      ImageItem
  >(),
  {
    class: '',
    sizes: '96px',
  }
)

const itemClass = cn(`
  group hover:bg-brand-soft/40 focus-visible:ring-brand-red/60 relative
  z-0 flex h-full w-full cursor-pointer flex-col items-center justify-center space-y-4
  rounded-lg p-4 transition-all duration-200 hover:z-10
  hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:outline-none
`)
</script>

<template>
  <NuxtLink v-if="props.to" :to="props.to" :class="itemClass">
    <SliderItemContent
      :name="props.name"
      :image_source="props.image_source"
      :image_alt="props.image_alt"
      :class="props.class"
      :sizes="props.sizes" />
  </NuxtLink>

  <button v-else type="button" @click="emit('click')" :class="itemClass">
    <SliderItemContent
      :name="props.name"
      :image_source="props.image_source"
      :image_alt="props.image_alt"
      :class="props.class"
      :sizes="props.sizes" />
  </button>
</template>
