<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref<boolean>(false)

withDefaults(
  defineProps<{
    menuItems?: MenuItem[]
    menuOpenAriaLabel?: string
    mobileMenuAriaLabel?: string
    mobileMenuBackAriaLabel?: string
    mobileMenuOpenSectionAriaPrefix?: string
    mobileMenuSelectItemAriaPrefix?: string
    menuMobileLogoSource?: string
    menuMobileLogoAlt?: string
  }>(),
  {
    menuItems: () => [],
    menuOpenAriaLabel: 'Открыть меню',
    mobileMenuAriaLabel: 'Меню',
    mobileMenuBackAriaLabel: 'Назад',
    mobileMenuOpenSectionAriaPrefix: 'Открыть раздел',
    mobileMenuSelectItemAriaPrefix: 'Выбрать пункт',
    menuMobileLogoSource: '/images/logo/logo_menu.svg',
    menuMobileLogoAlt: 'menu logo',
  }
)
</script>

<template>
  <nav class="bg-brand-dark text-brand-white">
    <NavMenu :items="menuItems" />

    <div class="mx-auto flex h-11 max-w-6xl items-center justify-end lg:hidden">
      <button
        class="px-5"
        type="button"
        aria-controls="mobile-menu"
        :aria-label="menuOpenAriaLabel"
        :aria-expanded="isMobileMenuOpen"
        @click="isMobileMenuOpen = true">
        <Burger />
      </button>
    </div>

    <MobileMenu
      v-model:open="isMobileMenuOpen"
      :items="menuItems"
      :logoSource="menuMobileLogoSource"
      :logoAlt="menuMobileLogoAlt"
      :menuAriaLabel="mobileMenuAriaLabel"
      :backAriaLabel="mobileMenuBackAriaLabel"
      :openSectionAriaPrefix="mobileMenuOpenSectionAriaPrefix"
      :selectItemAriaPrefix="mobileMenuSelectItemAriaPrefix" />
  </nav>
</template>
