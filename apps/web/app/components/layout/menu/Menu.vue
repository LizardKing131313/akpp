<script setup lang="ts">
import type { HeaderSettings } from '#shared/types/header'
import type { MenuItem } from '#shared/types/menu'

import { computed, ref } from 'vue'

import MobileMenu from '~/components/layout/menu/MobileMenu.vue'
import { useHeaderSettings, useMenus } from '~/composables/useRepoApi'

const isMobileMenuOpen = ref<boolean>(false)
const { data: menusData } = useMenus('header')
const menuItems = computed<MenuItem[]>(() => menusData.value ?? [])

const { data: settingsData } = await useHeaderSettings()
const settings = computed<HeaderSettings>(() => settingsData.value ?? ({} as HeaderSettings))
</script>

<template>
  <nav class="bg-brand-dark text-brand-white">
    <NavMenu :items="menuItems" />

    <div class="mx-auto flex h-11 max-w-6xl items-center justify-end lg:hidden">
      <button
        class="px-5"
        type="button"
        aria-controls="mobile-menu"
        :aria-label="settings.menu_open_aria_label"
        :aria-expanded="isMobileMenuOpen"
        @click="isMobileMenuOpen = true">
        <Burger />
      </button>
    </div>

    <MobileMenu v-if="isMobileMenuOpen" v-model:open="isMobileMenuOpen" :items="menuItems" />
  </nav>
</template>
