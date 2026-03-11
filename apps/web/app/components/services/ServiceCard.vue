<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { normalizeAppPath } from '#shared/lib/route'
import { computed } from 'vue'

const props = defineProps<{ service: ServiceItem }>()

const cardClass = computed<string>(() => {
  const baseClass = cn(
    `group relative overflow-hidden rounded-2xl
    shadow-sm transition-shadow duration-200 hover:shadow-lg`
  )
  const sizeClass = cn(`min-h-[120px] sm:min-h-[140px] lg:min-h-[150px]`)
  const spanClass = props.service.colspan === 2 ? 'lg:col-span-2' : 'lg:col-span-1'

  return cn(baseClass, sizeClass, spanClass)
})
</script>

<template>
  <NuxtLink :to="normalizeAppPath(`uslugi/${service.slug}`)" :class="cardClass">
    <CmsImage
      :src="service.image_source"
      :alt="service.image_alt"
      sizes="50vw md:50vw lg:20vw"
      :class="
        cn(`
          absolute inset-0 h-full w-full scale-100 object-cover
          transition-transform duration-300 ease-out group-hover:scale-105
        `)
      " />

    <div
      :class="
        cn(`
          bg-brand-dark/60 group-hover:bg-brand-dark/30 absolute
          inset-0 transition-colors duration-300
        `)
      " />
    <div
      :class="
        cn(`
          from-brand-dark/50 via-brand-dark/15 absolute inset-0 bg-linear-to-t to-transparent
        `)
      " />

    <div class="relative flex h-full items-end">
      <div class="flex w-full items-center gap-3 px-5 pb-4">
        <span class="text-brand-soft text-[11px] font-bold uppercase drop-shadow lg:text-sm">
          {{ service.name }}
        </span>

        <Arrow direction="right" />
      </div>
    </div>
  </NuxtLink>
</template>
