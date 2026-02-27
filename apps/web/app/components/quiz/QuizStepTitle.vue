<script setup lang="ts">
defineProps({ title: String })
</script>

<template>
  <h3 class="text-brand-dark text-2xl leading-8.5 font-bold">{{ title }}</h3>
  <p class="text-brand-grey-light mt-3 text-[15px] leading-5.75">
    <slot />
  </p>
</template>
