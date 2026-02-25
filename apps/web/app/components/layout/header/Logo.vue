<script setup lang="ts">
interface LogoProps {
  iconSource?: string
  iconSourceMobile?: string
  iconAlt?: string
  href?: string
  iconClass?: string
  iconMobileClass?: string
}

withDefaults(defineProps<LogoProps>(), {
  iconSource: '/images/logo/logo.svg',
  iconSourceMobile: '/images/logo/logo_mobile.svg',
  iconAlt: 'АКПЦЕНТР+',
  href: '/',
  iconClass: '',
  iconMobileClass: '',
})
</script>

<template>
  <div>
    <NuxtLink :to="href">
      <NuxtImg
        :src="iconSource"
        :alt="iconAlt"
        width="260"
        height="40"
        :class="['hidden lg:block', iconClass]" />

      <NuxtImg
        :src="iconSourceMobile"
        :alt="iconAlt"
        width="95"
        height="40"
        :class="['lg:hidden', iconMobileClass]" />
    </NuxtLink>
  </div>
</template>
