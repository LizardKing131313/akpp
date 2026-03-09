<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

import { useHeaderUiSettings } from '~/composables/useHeaderUiSettings'

type MenuScreen = {
  title?: string
  entries: MenuItem[]
  showLogo: boolean
}

const props = withDefaults(
  defineProps<{
    open: boolean
    items: MenuItem[]
  }>(),
  {}
)

const emit = defineEmits<{
  (event: 'update:open', value: boolean): void
  (event: 'select', entry: MenuItem): void
}>()

const screenStack = ref<MenuScreen[]>([])
const settings = useHeaderUiSettings()

const ensureRootScreen = (): void => {
  screenStack.value = [
    {
      entries: props.items,
      showLogo: true,
    },
  ]
}

const closeDrawer = (): void => {
  emit('update:open', false)
}

const canGoBack = computed<boolean>(() => screenStack.value.length > 1)

const activeScreen = computed<MenuScreen | null>(() => {
  const lastIndex = screenStack.value.length - 1
  return lastIndex >= 0 ? (screenStack.value[lastIndex] ?? null) : null
})

const activeTitle = computed<string>(() => activeScreen.value?.title ?? '')
const activeEntries = computed<MenuItem[]>(() => activeScreen.value?.entries ?? [])
const showLogo = computed<boolean>(() => activeScreen.value?.showLogo ?? true)

const openChildren = (entry: MenuItem): void => {
  const childrenEntries = entry.children ?? []
  if (childrenEntries.length === 0) return

  screenStack.value = [
    ...screenStack.value,
    {
      title: entry.name ?? '',
      entries: childrenEntries,
      showLogo: false,
    },
  ]
}

const goBack = (): void => {
  if (screenStack.value.length <= 1) return
  screenStack.value = screenStack.value.slice(0, -1)
}

const handleSelect = (entry: MenuItem): void => {
  emit('select', entry)
  closeDrawer()
}

const handleKeydown = (event: KeyboardEvent): void => {
  if (!props.open) return
  if (event.key === 'Escape') closeDrawer()
}

const isClient = computed<boolean>(() => import.meta.client)

const attachKeyboard = (): void => {
  if (!isClient.value) return
  window.addEventListener('keydown', handleKeydown)
}

const detachKeyboard = (): void => {
  if (!isClient.value) return
  window.removeEventListener('keydown', handleKeydown)
}

onMounted(() => {
  if (!props.open) return
  ensureRootScreen()
  attachKeyboard()
})

watch(
  () => props.open,
  (isOpen) => {
    if (!isClient.value) return

    if (isOpen) {
      ensureRootScreen()
      attachKeyboard()
      return
    }

    detachKeyboard()
    ensureRootScreen()
  }
)

onBeforeUnmount(() => {
  detachKeyboard()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="mobile-menu-overlay">
      <div
        v-if="open"
        class="bg-brand-dark/70 fixed inset-0 z-190"
        aria-hidden="true"
        @click="closeDrawer" />
    </Transition>

    <Transition name="mobile-menu-drawer">
      <!--suppress HtmlWrongAttributeValue -->
      <aside
        v-if="open"
        id="mobile-menu"
        ref="drawerRef"
        :aria-label="settings.mobile_menu_aria_label"
        aria-modal="true"
        class="bg-brand-white text-brand-dark fixed top-0 left-0 z-200 flex h-dvh w-65 flex-col"
        role="dialog"
        tabindex="-1"
        @click.stop>
        <div
          class="bg-brand-red text-brand-white grid h-14 items-center"
          :class="showLogo ? 'grid-cols-[56px_1fr_56px]' : 'grid-cols-[56px_1fr]'">
          <div class="flex h-14 w-14 items-center justify-center">
            <button
              v-if="canGoBack"
              class="bg-brand-dark text-brand-white flex h-14 w-14 items-center justify-center"
              type="button"
              :aria-label="settings.mobile_menu_back_aria_label"
              @click="goBack">
              <Arrow direction="left" class="text-brand-white" />
            </button>
          </div>

          <div class="flex h-14 items-center justify-center">
            <CmsImage
              v-if="showLogo"
              :src="settings.menu_mobile_logo_source"
              :alt="settings.menu_mobile_logo_alt"
              width="220"
              height="40"
              class="h-8 w-auto" />
            <span v-else class="text-center text-sm font-semibold tracking-wide uppercase">
              {{ activeTitle }}
            </span>
          </div>

          <div v-if="showLogo" class="h-14 w-14"></div>
        </div>

        <nav class="flex-1 overflow-y-auto py-2">
          <MobileMenuItem
            v-for="entry in activeEntries"
            :key="entry.id"
            :entry
            @navigate="openChildren"
            @select="handleSelect" />
        </nav>
      </aside>
    </Transition>
  </Teleport>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
.mobile-menu-overlay-enter-active,
.mobile-menu-overlay-leave-active {
  transition: opacity 200ms;
}
.mobile-menu-overlay-enter-from,
.mobile-menu-overlay-leave-to {
  opacity: 0;
}

.mobile-menu-drawer-enter-active,
.mobile-menu-drawer-leave-active {
  transition: transform 250ms;
}
.mobile-menu-drawer-enter-from,
.mobile-menu-drawer-leave-to {
  transform: translateX(-100%);
}
</style>
