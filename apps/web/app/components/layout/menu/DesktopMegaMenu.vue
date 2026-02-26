<script setup lang="ts">
import type { MenuNode } from '#shared/types/layout/menu/menu'

import { cn } from '#shared/lib/cn'
import { computed, ref, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{ menuNode: MenuNode }>()
const attrs = useAttrs()

const isOpen = ref<boolean>(false)
const activeLeftId = ref<string | null>(null)
const hasPointerMovedInsidePanel = ref<boolean>(false)

let closeTimerId: ReturnType<typeof setTimeout> | null = null

const leftColumnWidthPx = 180
const rightColumnWidthPx = 180

const leftItems = computed<MenuNode[]>(() => props.menuNode.children ?? [])

const activeLeftItem = computed<MenuNode | null>(() => {
  if (activeLeftId.value === null) return null
  return leftItems.value.find((node) => node.id === activeLeftId.value) ?? null
})

const rightItems = computed<MenuNode[]>(() => activeLeftItem.value?.children ?? [])

const hasRightColumn = computed<boolean>(() => {
  return rightItems.value.length > 0
})

const panelStyle = computed<Record<string, string>>(() => {
  const widthPx = hasRightColumn.value ? leftColumnWidthPx + rightColumnWidthPx : leftColumnWidthPx
  return { width: `${widthPx}px` }
})

const gridStyle = computed<Record<string, string>>(() => {
  if (!hasRightColumn.value) return { gridTemplateColumns: `${leftColumnWidthPx}px` }
  return { gridTemplateColumns: `${leftColumnWidthPx}px ${rightColumnWidthPx}px` }
})

const clearCloseTimer = (): void => {
  if (closeTimerId === null) return
  clearTimeout(closeTimerId)
  closeTimerId = null
}

const openNow = (): void => {
  clearCloseTimer()
  if (!isOpen.value) {
    isOpen.value = true
    hasPointerMovedInsidePanel.value = false
    return
  }
  isOpen.value = true
}

const scheduleClose = (): void => {
  clearCloseTimer()
  closeTimerId = setTimeout(() => {
    isOpen.value = false
    activeLeftId.value = null
    hasPointerMovedInsidePanel.value = false
  }, 120)
}

const markPointerInside = (): void => {
  hasPointerMovedInsidePanel.value = true
}

const setActiveLeft = (node: MenuNode): void => {
  if (!hasPointerMovedInsidePanel.value) return

  if (node.hasChildren()) {
    activeLeftId.value = node.id
    return
  }

  activeLeftId.value = null
}

const handlePanelEnter = (): void => {
  openNow()
  markPointerInside()
}
</script>

<template>
  <div :class="[attrs.class, 'group relative']" @mouseenter="openNow" @mouseleave="scheduleClose">
    <button
      type="button"
      aria-haspopup="menu"
      :class="
        cn(`
          text-brand-soft hover:text-brand-red flex w-full cursor-pointer!
          items-center justify-center gap-1 text-center text-sm uppercase
        `)
      ">
      <span class="text-brand-soft group-hover:text-brand-red cursor-pointer!">
        {{ menuNode.title }}
      </span>
      <Arrow direction="down" class="text-brand-soft group-hover:text-brand-red" />
    </button>

    <div
      v-if="isOpen && menuNode.hasChildren()"
      :class="
        cn(`
          border-brand-grey-light/10 bg-brand-white text-brand-dark absolute
          top-full left-0 z-50 mt-3 overflow-hidden rounded border shadow-xl
        `)
      "
      :style="panelStyle"
      @mouseenter="handlePanelEnter"
      @mouseleave="scheduleClose">
      <div class="grid" :style="gridStyle">
        <div>
          <NuxtLink
            v-for="node in leftItems"
            :key="node.id"
            :to="node.href ?? '#'"
            :class="[
              `group/menu-item flex w-full cursor-pointer items-center justify-between
              px-6 py-4 text-left text-sm font-semibold tracking-wide uppercase transition-colors`,
              activeLeftId === node.id
                ? 'bg-brand-red text-brand-soft'
                : 'text-brand-dark hover:bg-brand-red hover:text-brand-soft',
            ]"
            @mouseenter="setActiveLeft(node)">
            <span>{{ node.title }}</span>

            <Arrow
              v-if="node.hasChildren()"
              direction="right"
              :class="
                cn(
                  'transition-colors',
                  activeLeftId === node.id
                    ? 'text-brand-soft'
                    : 'text-brand-dark group-hover/menu-item:text-brand-soft'
                )
              " />
          </NuxtLink>
        </div>

        <div v-if="hasRightColumn">
          <NuxtLink
            v-for="node in rightItems"
            :key="node.id"
            :to="node.href ?? '#'"
            :class="
              cn(`
                text-brand-dark hover:bg-brand-red hover:text-brand-soft
                block px-6 py-4 text-sm font-semibold tracking-wide uppercase
              `)
            "
            @click="isOpen = false">
            {{ node.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
