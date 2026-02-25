<script setup lang="ts">
import type { MenuNode } from '#shared/types/layout/menu/menu'

defineProps<{ menuNode: MenuNode }>()

const buttonClass =
  'flex-1 py-4 text-center uppercase ' +
  'text-sm cursor-pointer text-shadow-surface-soft hover:text-red-500'
</script>

<template>
  <NuxtLink v-if="menuNode.href" :to="menuNode.href" :class="buttonClass">
    {{ menuNode.title }}
  </NuxtLink>

  <DesktopMegaMenu v-else-if="menuNode.hasChildren()" :menuNode :class="buttonClass" />

  <span v-else :class="buttonClass">
    {{ menuNode.title }}
  </span>
</template>
