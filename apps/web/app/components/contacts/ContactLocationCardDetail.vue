<script setup lang="ts">
import type { ContactLocation } from '#shared/types/components/location'

defineProps<{ location: ContactLocation; onBack: () => void }>()
</script>

<template>
  <ContactLocationCardContent :location detail :on-back="onBack" />
</template>
