<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { normalizeAppPath } from '#shared/lib/route'
import { computed, ref, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{ menuNode: MenuItem }>()
const attrs = useAttrs()

const isOpen = ref<boolean>(false)
const activeLeftId = ref<string | null>(null)

let closeTimerId: ReturnType<typeof setTimeout> | null = null

const leftColumnWidthPx = 225

const leftItems = computed<MenuItem[]>(() => props.menuNode.children ?? [])
const panelId = computed<string>(() => `desktop-mega-menu-${props.menuNode.id}`)
const panelStyle = computed<Record<string, string>>(() => ({ width: `${leftColumnWidthPx}px` }))

const clearCloseTimer = (): void => {
  if (closeTimerId === null) return
  clearTimeout(closeTimerId)
  closeTimerId = null
}

const openNow = (): void => {
  clearCloseTimer()
  isOpen.value = true

  if (activeLeftId.value !== null) {
    return
  }

  const firstItemWithChildren = leftItems.value.find((node) => hasChildren(node))
  activeLeftId.value = firstItemWithChildren?.id ?? leftItems.value[0]?.id ?? null
}

const scheduleClose = (): void => {
  clearCloseTimer()
  closeTimerId = setTimeout(() => {
    isOpen.value = false
    activeLeftId.value = null
  }, 120)
}

const setActiveLeft = (node: MenuItem): void => {
  if (hasChildren(node)) {
    activeLeftId.value = node.id
    return
  }

  activeLeftId.value = null
}

const handlePanelEnter = (): void => {
  openNow()
}

const hasChildren = (menuItem: MenuItem) => menuItem.children !== null
</script>

<template>
  <div :class="[attrs.class, 'group relative']" @mouseenter="openNow" @mouseleave="scheduleClose">
    <button
      type="button"
      :aria-controls="hasChildren(menuNode) ? panelId : undefined"
      :aria-expanded="hasChildren(menuNode) ? isOpen : undefined"
      aria-haspopup="true"
      :class="
        cn(`
          text-brand-white hover:text-brand-red flex h-full w-full cursor-pointer!
          items-center justify-center gap-1 text-center text-sm font-semibold uppercase
          transition-colors
        `)
      ">
      <span class="text-brand-white group-hover:text-brand-red cursor-pointer!">
        {{ menuNode.name }}
      </span>
      <Arrow direction="down" class="text-brand-white group-hover:text-brand-red" />
    </button>

    <div
      v-if="isOpen && hasChildren(menuNode)"
      :id="panelId"
      :class="
        cn(`
          border-brand-soft bg-brand-white text-brand-dark absolute
          top-full left-1/2 z-50 overflow-visible border shadow-[0_18px_40px_rgba(0,0,0,0.18)]
        `)
      "
      :style="panelStyle"
      style="transform: translateX(-50%)"
      @mouseenter="handlePanelEnter"
      @mouseleave="scheduleClose">
      <div class="relative">
        <div>
          <div v-for="node in leftItems" :key="node.id" class="relative">
            <NuxtLink
              :to="node.slug ? normalizeAppPath(node.slug) : '#'"
              :class="[
                `group/menu-item flex w-full cursor-pointer items-center justify-between
                px-6 py-4 text-left text-sm font-semibold uppercase transition-colors`,
                activeLeftId === node.id
                  ? 'bg-brand-red text-brand-white'
                  : 'text-brand-dark hover:bg-brand-red hover:text-brand-white',
              ]"
              @mouseenter="setActiveLeft(node)"
              @click="isOpen = false">
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

            <div
              v-if="activeLeftId === node.id && hasChildren(node)"
              class="border-brand-soft bg-brand-white absolute top-0 left-full min-w-56 border shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
              <NuxtLink
                v-for="childNode in node.children ?? []"
                :key="childNode.id"
                :to="childNode.slug ? normalizeAppPath(childNode.slug) : '#'"
                class="text-brand-grey hover:bg-brand-red hover:text-brand-white block px-6 py-4 text-sm font-semibold whitespace-nowrap uppercase transition-colors"
                @click="isOpen = false">
                {{ childNode.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
