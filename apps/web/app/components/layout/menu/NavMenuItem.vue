<script setup lang="ts">
defineProps<{ menuNode: MenuItem }>()

const buttonClass =
  'flex-1 py-4 text-center uppercase ' +
  'text-sm cursor-pointer text-brand-white hover:text-brand-red'
</script>

<template>
  <NuxtLink v-if="menuNode.slug" :to="menuNode.slug" :class="buttonClass">
    {{ menuNode.name }}
  </NuxtLink>

  <DesktopMegaMenu v-else-if="menuNode.children != null" :menuNode :class="buttonClass" />

  <span v-else :class="buttonClass">
    {{ menuNode.name }}
  </span>
</template>
