<script setup lang="ts">
import type { LocationItem } from '#shared/types/location'

defineProps<{ location: LocationItem; onBack: () => void }>()
</script>

<template>
  <ContactLocationCardContent :location detail :on-back="onBack" />
</template>
