<script setup lang="ts">
const requestUrl = useRequestURL()
const activeCity = useActiveCity()

const organizationJsonLd = computed<Record<string, unknown>>(() => {
  const city = activeCity.value

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${requestUrl.origin}/#organization`,
        name: 'АКПП Центр',
        url: requestUrl.origin,
      },
      {
        '@type': 'WebSite',
        '@id': `${requestUrl.origin}/#website`,
        url: requestUrl.origin,
        name: 'АКПП Центр',
        inLanguage: 'ru-RU',
        publisher: {
          '@id': `${requestUrl.origin}/#organization`,
        },
      },
      ...(city
        ? [
            {
              '@type': 'Organization',
              '@id': `${requestUrl.origin}/#city-organization`,
              name: `АКПП Центр ${city.name}`,
              url: requestUrl.origin,
              telephone: city.phone_number || undefined,
              email: city.email_value || undefined,
            },
          ]
        : []),
    ],
  }
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(organizationJsonLd.value),
    },
  ],
}))
</script>

<template>
  <div class="bg-brand-white text-brand-dark flex min-h-dvh flex-col overflow-x-hidden text-xl">
    <HeaderSection />

    <slot />

    <FooterSection class="mt-auto" />
  </div>

  <ModalHost />
</template>
