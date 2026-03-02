<script setup lang="ts">
interface ExpandableHtmlProps {
  collapsedHeight?: number
  expandText?: string
  collapseText?: string
}

const props = withDefaults(defineProps<ExpandableHtmlProps>(), {
  collapsedHeight: 210,
  expandText: 'Показать еще',
  collapseText: 'Свернуть',
})

const isExpanded = ref<boolean>(false)

const contentStyle = computed<Record<string, string>>(() => {
  if (isExpanded.value) {
    return {}
  }

  return {
    maxHeight: `${props.collapsedHeight}px`,
  }
})

const toggleExpanded = (): void => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <section class="w-full">
    <div class="space-y-6">
      <div class="relative">
        <div class="overflow-hidden" :style="contentStyle">
          <div class="text-brand-grey prose prose-sm max-w-none">
            <slot />
          </div>
        </div>

        <div
          v-if="!isExpanded"
          class="from-brand-white pointer-events-none absolute inset-x-0 bottom-0 h-18 bg-linear-to-t to-transparent"></div>
      </div>

      <div class="flex justify-center">
        <MainButton @click="toggleExpanded" class="flex w-auto items-center justify-center px-14">
          {{ isExpanded ? collapseText : expandText }}
        </MainButton>
      </div>
    </div>
  </section>
</template>
