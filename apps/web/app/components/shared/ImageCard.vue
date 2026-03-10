<script setup lang="ts">
import type { ImageCardItem } from '#shared/types/entity'

import { normalizeAppPath } from '#shared/lib/route'

const props = withDefaults(defineProps<{ label?: string } & ImageCardItem>(), {
  label: 'Подробнее',
})
</script>

<template>
  <NuxtLink
    :to="normalizeAppPath(slug)"
    class="group bg-brand-white flex h-full flex-col overflow-hidden shadow-xl">
    <div class="overflow-hidden">
      <CmsImage
        :src="image_source"
        :alt="image_alt"
        width="600"
        height="400"
        class="h-48 w-full object-contain transition-transform duration-300 group-hover:scale-105" />
    </div>

    <div class="flex flex-1 flex-col p-4">
      <span class="text-brand-grey-light mb-2 text-xs">
        {{ date }}
      </span>

      <h3
        class="text-brand-dark group-hover:text-brand-red text-base leading-snug font-bold transition-colors">
        {{ props.name }}
      </h3>

      <span
        class="text-brand-grey-light group-hover:text-brand-red mt-auto flex justify-end text-sm">
        {{ label }}
        <Arrow direction="right" class="text-brand-grey-light group-hover:text-brand-red" />
      </span>
    </div>
  </NuxtLink>
</template>
