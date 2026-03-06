<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref<boolean>(false)

withDefaults(defineProps<{ menuItems?: MenuItem[] }>(), { menuItems: () => [] })
</script>

<template>
  <nav class="bg-brand-dark text-brand-white">
    <NavMenu :items="menuItems" />

    <div class="mx-auto flex h-11 max-w-6xl items-center justify-end lg:hidden">
      <button
        class="px-5"
        type="button"
        aria-controls="mobile-menu"
        aria-label="Открыть меню"
        :aria-expanded="isMobileMenuOpen"
        @click="isMobileMenuOpen = true">
        <Burger />
      </button>
    </div>

    <MobileMenu
      v-model:open="isMobileMenuOpen"
      :items="menuItems"
      logoSource="/images/logo/logo_menu.svg" />
  </nav>
</template>
