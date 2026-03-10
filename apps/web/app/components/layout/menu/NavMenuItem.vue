<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { normalizeAppPath } from '#shared/lib/route'

defineProps<{ menuNode: MenuItem }>()

const buttonClass = cn(`
    text-brand-white hover:text-brand-red flex-1
    cursor-pointer py-4 text-center text-sm uppercase
  `)
</script>

<template>
  <NuxtLink v-if="menuNode.slug" :to="normalizeAppPath(menuNode.slug)" :class="buttonClass">
    {{ menuNode.name }}
  </NuxtLink>

  <DesktopMegaMenu v-else-if="menuNode.children != null" :menuNode :class="buttonClass" />

  <span v-else :class="buttonClass">
    {{ menuNode.name }}
  </span>
</template>
