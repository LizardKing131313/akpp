<script setup lang="ts">
import type { ContactLocation } from '#shared/types/components/location'

const props = defineProps<{ location: ContactLocation }>()

const emit = defineEmits<{
  (event: 'open', location: ContactLocation): void
}>()

const handleOpen = (): void => {
  emit('open', props.location)
}
</script>

<template>
  <button type="button" class="group block w-full cursor-pointer" @click="handleOpen">
    <ContactLocationCardContent :location />
  </button>
</template>
