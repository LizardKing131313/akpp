<script setup lang="ts">
import { MenuNode } from '#shared/types/layout/menu/menu'
import { ref } from 'vue'

const isMobileMenuOpen = ref<boolean>(false)

const menuItems = ref<MenuNode[]>([
  new MenuNode({
    id: 'home',
    title: 'Главная',
    href: '/',
  }),

  new MenuNode({
    id: 'repair',
    title: 'Ремонт акпп',
    children: [
      new MenuNode({
        id: 'hyundai',
        title: 'Hyundai',
      }),
      new MenuNode({
        id: 'renault',
        title: 'Renault',
        children: [
          new MenuNode({
            id: 'logan',
            title: 'Logan',
          }),
        ],
      }),
      new MenuNode({
        id: 'skoda',
        title: 'Skoda',
      }),
      new MenuNode({
        id: 'opel',
        title: 'Opel',
      }),
      new MenuNode({
        id: 'nissan',
        title: 'Nissan',
      }),
      new MenuNode({
        id: 'chery',
        title: 'Chery',
      }),
      new MenuNode({
        id: 'haval',
        title: 'Haval',
      }),
    ],
  }),

  new MenuNode({
    id: 'services',
    title: 'Услуги',
    href: '/services',
  }),

  new MenuNode({
    id: 'detect',
    title: 'Определить акпп',
  }),

  new MenuNode({
    id: 'sell',
    title: 'Продажа акпп',
  }),

  new MenuNode({
    id: 'contacts',
    title: 'Контакты',
  }),
])
</script>

<template>
  <nav class="bg-brand-dark text-brand-soft">
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
