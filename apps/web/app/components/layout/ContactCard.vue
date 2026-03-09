<script setup lang="ts">
import { cn } from '#shared/lib/cn'

export type LinkType = 'tel' | 'email' | 'url'

interface ContactCardProps {
  iconSource?: string | undefined
  iconAlt?: string | undefined
  title?: string | undefined
  subtitle?: string | undefined
  href?: string | undefined
  linkType?: LinkType
  iconClass?: string | undefined
  titleClass?: string | undefined
  subtitleClass?: string | undefined
}

const props = withDefaults(defineProps<ContactCardProps>(), {
  iconSource: '',
  iconAlt: '',
  title: '',
  subtitle: '',
  href: '',
  linkType: 'url',
  iconClass: '',
  titleClass: '',
  subtitleClass: '',
})

const computedHref = computed<string>(() => {
  if (!props.href) return ''

  if (props.linkType === 'tel') return `tel:${props.href}`
  if (props.linkType === 'email') return `mailto:${props.href}`

  return props.href
})
</script>

<template>
  <div class="flex items-center gap-3 px-4">
    <CmsImage
      :src="iconSource"
      :alt="iconAlt"
      sizes="(max-width: 1023px) 28px, 35px"
      :class="cn('h-7 w-7 shrink-0 object-contain lg:h-8.75 lg:w-8.75', iconClass)" />

    <div class="flex flex-col text-left">
      <component
        :is="href ? 'a' : 'span'"
        :href="href ? computedHref : undefined"
        :class="
          cn(
            'text-brand-dark text-lg font-bold transition-colors duration-200',
            href && 'hover:text-brand-red underline-offset-4 hover:underline',
            titleClass
          )
        ">
        {{ title }}
      </component>

      <span v-if="subtitle" :class="cn('text-brand-grey-light text-sm', subtitleClass)">
        {{ subtitle }}
      </span>
    </div>
  </div>
</template>
