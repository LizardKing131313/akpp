<script setup lang="ts">
defineProps<{ items: MenuItem[] }>()
</script>

<template>
  <nav class="bg-brand-dark text-brand-white hidden lg:block">
    <div class="mx-auto flex max-w-6xl items-center justify-between">
      <NavMenuItem v-for="menuNode in items" :key="menuNode.id" :menuNode />
    </div>
  </nav>
</template>
