<script setup lang="ts">
import type { MenuNode } from '#shared/types/layout/menu/menu'

defineProps<{ items: MenuNode[] }>()
</script>

<template>
  <nav class="bg-brand-dark text-surface-soft hidden lg:block">
    <div class="mx-auto flex max-w-6xl items-center justify-between">
      <NavMenuItem v-for="menuNode in items" :key="menuNode.id" :menuNode />
    </div>
  </nav>
</template>
