<script setup lang="ts">
import { CitySelectModal, QuizModal, ShopModal, SignupModal } from '#components'
import { cn } from '#shared/lib/cn'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { useModal } from '~/composables/modal/useModal'

const { modalState, close } = useModal()

const activeComponent = computed(() => {
  if (!modalState.value.isOpen || modalState.value.name === null) return null
  if (modalState.value.name === 'signup') return SignupModal
  if (modalState.value.name === 'shop') return ShopModal
  if (modalState.value.name === 'repairQuiz') return QuizModal
  if (modalState.value.name === 'selectCity') return CitySelectModal
  return null
})

const handleKeydown = (event: KeyboardEvent): void => {
  if (!modalState.value.isOpen) return
  if (event.key !== 'Escape') return
  event.preventDefault()
  close()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})

watch(
  () => modalState.value.isOpen,
  (isOpenNow) => {
    if (!import.meta.client) return

    const documentElement = document.documentElement

    if (isOpenNow) {
      const scrollBarWidthPx = window.innerWidth - documentElement.clientWidth
      documentElement.style.paddingRight = `${scrollBarWidthPx}px`
      documentElement.classList.add('overflow-hidden')
      return
    }

    documentElement.classList.remove('overflow-hidden')
    documentElement.style.paddingRight = ''
  },
  { immediate: true }
)

const startY = ref<number | null>(null)
const deltaY = ref<number>(0)

const onTouchStart = (e: TouchEvent): void => {
  if (!modalState.value.isOpen) return
  startY.value = e.touches[0]?.clientY ?? null
  deltaY.value = 0
}

const onTouchMove = (e: TouchEvent): void => {
  if (startY.value === null) return
  const y = e.touches[0]?.clientY ?? 0
  deltaY.value = Math.max(0, y - startY.value)
}

const onTouchEnd = (): void => {
  if (deltaY.value > 90) close()
  startY.value = null
  deltaY.value = 0
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-overlay">
      <div
        v-if="modalState.isOpen"
        :class="
          cn(`
            fixed inset-0 z-9999 flex items-start
            justify-center p-4 pt-4 sm:items-center sm:pt-4
          `)
        "
        role="dialog"
        aria-modal="true"
        aria-label="Окно">
        <button
          type="button"
          :class="
            cn(`
              from-brand-dark/70 to-brand-dark/80 absolute
              inset-0 cursor-default bg-linear-to-b
            `)
          "
          aria-label="Закрыть окно"
          @click="close" />

        <div class="relative flex h-full items-start justify-center sm:items-center">
          <Transition name="modal-panel" appear>
            <div
              v-if="modalState.isOpen"
              class="w-full max-w-md sm:max-w-4xl"
              @touchstart="onTouchStart"
              @touchmove="onTouchMove"
              @touchend="onTouchEnd">
              <component
                :is="activeComponent"
                v-if="activeComponent !== null"
                :payload="modalState.payload ?? {}"
                @close="close" />
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
.modal-overlay-enter-active,
.modal-overlay-leave-active {
  transition: opacity 160ms ease;
}

.modal-overlay-enter-from,
.modal-overlay-leave-to {
  opacity: 0;
}

.modal-panel-enter-active,
.modal-panel-leave-active {
  transition:
    transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 180ms ease;
  will-change: transform;
}

.modal-panel-enter-from,
.modal-panel-leave-to {
  opacity: 0;
  transform: translateY(18px);
}

@media (min-width: 640px) {
  .modal-panel-enter-from,
  .modal-panel-leave-to {
    transform: translateY(10px) scale(0.98);
  }
}
</style>
