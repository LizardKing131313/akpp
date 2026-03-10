<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { normalizeAppPath } from '#shared/lib/route'
import { computed, ref, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{ menuNode: MenuItem }>()
const attrs = useAttrs()

const isOpen = ref<boolean>(false)
const activeLeftId = ref<string | null>(null)
const hasPointerMovedInsidePanel = ref<boolean>(false)

let closeTimerId: ReturnType<typeof setTimeout> | null = null

const leftColumnWidthPx = 180
const rightColumnWidthPx = 180

const leftItems = computed<MenuItem[]>(() => props.menuNode.children ?? [])

const activeLeftItem = computed<MenuItem | null>(() => {
  if (activeLeftId.value === null) return null
  return leftItems.value.find((node) => node.id === activeLeftId.value) ?? null
})

const rightItems = computed<MenuItem[]>(() => activeLeftItem.value?.children ?? [])

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

const setActiveLeft = (node: MenuItem): void => {
  if (!hasPointerMovedInsidePanel.value) return

  if (hasChildren(node)) {
    activeLeftId.value = node.id
    return
  }

  activeLeftId.value = null
}

const handlePanelEnter = (): void => {
  openNow()
  markPointerInside()
}

const hasChildren = (menuItem: MenuItem) => menuItem.children !== null
</script>

<template>
  <div :class="[attrs.class, 'group relative']" @mouseenter="openNow" @mouseleave="scheduleClose">
    <button
      type="button"
      aria-haspopup="menu"
      :class="
        cn(`
          text-brand-white hover:text-brand-red flex w-full cursor-pointer!
          items-center justify-center gap-1 text-center text-sm uppercase
        `)
      ">
      <span class="text-brand-white group-hover:text-brand-red cursor-pointer!">
        {{ menuNode.name }}
      </span>
      <Arrow direction="down" class="text-brand-white group-hover:text-brand-red" />
    </button>

    <div
      v-if="isOpen && hasChildren(menuNode)"
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
            :to="node.slug ? normalizeAppPath(node.slug) : '#'"
            :class="[
              `group/menu-item flex w-full cursor-pointer items-center justify-between
              px-6 py-4 text-left text-sm font-semibold tracking-wide uppercase transition-colors`,
              activeLeftId === node.id
                ? 'bg-brand-red text-brand-white'
                : 'text-brand-dark hover:bg-brand-red hover:text-brand-white',
            ]"
            @mouseenter="setActiveLeft(node)">
            <span>{{ node.name }}</span>

            <Arrow
              v-if="hasChildren(node)"
              direction="right"
              :class="
                cn(
                  'transition-colors',
                  activeLeftId === node.id
                    ? 'text-brand-white'
                    : 'text-brand-dark group-hover/menu-item:text-brand-white'
                )
              " />
          </NuxtLink>
        </div>

        <div v-if="hasRightColumn">
          <NuxtLink
            v-for="node in rightItems"
            :key="node.id"
            :to="node.slug ? normalizeAppPath(node.slug) : '#'"
            :class="
              cn(`
                text-brand-dark hover:bg-brand-red hover:text-brand-white
                block px-6 py-4 text-sm font-semibold tracking-wide uppercase
              `)
            "
            @click="isOpen = false">
            {{ node.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
