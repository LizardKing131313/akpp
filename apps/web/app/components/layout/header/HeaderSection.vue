<template>
  <header class="w-full">
    <TopBar
      iconSource="/images/icons/location.svg"
      iconAlt="location"
      city="Москва"
      searchIconSource="/images/icons/search.svg"
      searchPlaceholder="Поиск" />

    <div class="bg-surface-soft">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:py-6">
        <Logo />

        <div class="flex items-center gap-0">
          <ContactCard
            iconSource="/images/icons/time.svg"
            iconAlt="time"
            title="Пн - Вс 9:00 - 21:00"
            subtitle="Без выходных"
            class="hidden lg:flex" />

          <ContactCard
            iconSource="/images/icons/phone.svg"
            iconAlt="phone"
            title="+7 499 999 99 99"
            subtitle="Бесплатная консультация"
            linkType="tel"
            href="+74999999999"
            class="gap-1! px-0! lg:gap-3! lg:px-6!"
            titleClass="lg:text-lg! text-sm!"
            subtitleClass="hidden lg:block" />
        </div>
      </div>
    </div>

    <Menu />
  </header>
</template>
