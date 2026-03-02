<script setup lang="ts">
import { cn } from '#shared/lib/cn'

const emit = defineEmits<{
  (event: 'click'): void
}>()

const props = withDefaults(
  defineProps<{
    alt?: string | undefined
    class?: string
    href?: string | undefined
    sizes?: string
    source: string
    title: string
  }>(),
  {
    alt: undefined,
    class: '',
    href: undefined,
    sizes: '96px',
  }
)

const isLink = computed<boolean>(() => Boolean(props.href))
</script>

<template>
  <component
    :is="isLink ? 'NuxtLink' : 'button'"
    :to="isLink ? props.href : undefined"
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
      <NuxtImg
        :src="source"
        :alt="alt"
        fill
        :sizes="sizes"
        class="absolute inset-0 h-full w-full object-contain" />
    </div>

    <span class="text-brand-dark text-center text-xs font-bold tracking-wide uppercase">
      {{ title }}
    </span>
  </component>
</template>
