<script setup lang="ts">
withDefaults(
  defineProps<{
    href: string
    ariaLabel?: string | undefined
  }>(),
  {
    ariaLabel: '',
  }
)
</script>

<template>
  <NuxtLink
    :to="href"
    :aria-label="ariaLabel || undefined"
    class="text-brand-grey-light hover:text-brand-white group block w-full text-sm transition-colors">
    <div class="flex items-center font-bold uppercase">
      <span><slot /></span>
      <Arrow
        direction="right"
        double
        class="ml-auto transition-transform group-hover:translate-x-0.5" />
    </div>
  </NuxtLink>
</template>
