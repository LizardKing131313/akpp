<template>
  <footer class="w-full">
    <!-- MAP SECTION -->
    <div class="bg-surface-soft relative w-full">
      <div class="relative h-90 w-full overflow-hidden md:h-105">
        <img
          src="/images/map_stub.png"
          alt="map"
          class="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <!-- CONTACT PILL -->
      <div class="relative mx-auto max-w-6xl px-4">
        <div class="absolute inset-x-0 top-full z-100 -translate-y-1/2">
          <div class="rounded-full bg-white px-8 py-5 shadow-xl">
            <div class="flex items-center justify-center text-sm text-gray-700">
              <!-- ITEM 1 -->
              <div class="flex items-center gap-3 px-6">
                <span class="text-brand-red">📍</span>
                <div class="flex flex-col text-left">
                  <span class="text-lg font-bold">akppcenter77@yandex.ru</span>
                  <span class="text-sm text-gray-400">Написать письмо</span>
                </div>
              </div>

              <!-- DIVIDER -->
              <div class="h-8 w-px bg-gray-300/60"></div>

              <!-- ITEM 2 -->
              <div class="flex items-center gap-3 px-6">
                <span class="text-brand-red">📱</span>
                <div class="flex flex-col text-left">
                  <span class="text-lg font-bold">+7 499 999 99 99</span>
                  <span class="text-sm text-gray-400">Бесплатная консультация</span>
                </div>
              </div>

              <!-- DIVIDER -->
              <div class="h-8 w-px bg-gray-300/60"></div>

              <!-- ITEM 3 -->
              <div class="flex items-center gap-3 px-6">
                <span class="text-brand-red">⏰</span>
                <div class="flex flex-col text-left">
                  <span class="text-lg font-bold">Пн - Вс 9:00 - 21:00</span>
                  <span class="text-sm text-gray-400">Без выходных</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BRANDS ROW -->
    <div class="bg-surface-base relative z-0 pt-16 pb-12">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-4">
        <img
          v-for="brand in brands"
          :key="brand"
          :src="brand"
          alt="brand"
          class="h-8 object-contain grayscale transition hover:grayscale-0"
        />
      </div>
    </div>

    <!-- DARK FOOTER -->
    <div class="relative bg-[#222222] pt-24 pb-8 text-white">
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_center,#3C3C3C_0%,#222222_100%)] md:bg-[radial-gradient(ellipse_40%_100%_at_center,#3C3C3C_0%,#222222_100%)]"
      />

      <div class="relative mx-auto max-w-6xl px-4">
        <!-- 2x2 GRID -->
        <div class="grid gap-10 md:grid-cols-2">
          <!-- TOP-LEFT (splits into 2 columns) -->
          <div class="grid md:grid-cols-[1.5fr_1fr] md:gap-x-16">
            <!-- Brand + text -->
            <div>
              <h3 class="mb-2 text-2xl font-bold text-white/80">
                АКПП<span class="text-brand-red">ЦЕНТР+</span>
              </h3>
              <div class="mb-8 h-px w-15 bg-[#777777]" />
              <p class="text-sm text-white/60">
                АКППЦЕНТР - профильный сервис по ремонту коробок автомат. Недорого, быстро и с
                гарантией мы ремонтируем автоматические коробки передач уже более 10 лет.
              </p>
            </div>

            <!-- Menu -->
            <div>
              <h4 class="mb-2 text-2xl font-bold text-white/80">Меню</h4>
              <div class="mb-8 h-px w-15 bg-[#777777]" />
              <ul class="space-y-1 text-sm text-white/60">
                <li v-for="item in menu" :key="item">
                  <a href="#" class="transition hover:text-white">
                    {{ item }}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- TOP-RIGHT (articles) -->
          <div class="pl-12">
            <h4 class="mb-2 text-2xl font-bold text-white/80">Полезные статьи</h4>
            <div class="mb-8 h-px w-15 bg-[#777777]" />
            <div class="space-y-0">
              <div
                v-for="article in articles"
                :key="article.title"
                class="mb-2 flex items-start border-b border-[#777777]"
              >
                <img
                  :src="article.image"
                  alt="article"
                  class="mr-2 mb-2 h-16 w-24 rounded object-cover"
                />

                <div class="mb-2 min-w-0 flex-1">
                  <div class="flex items-start justify-between gap-4">
                    <a
                      href="#"
                      class="line-clamp-2 text-sm text-white/80 transition hover:text-white"
                    >
                      {{ article.title }}
                    </a>
                    <span class="text-brand-red shrink-0">>></span>
                  </div>

                  <div class="text-xs text-white/40">
                    {{ article.date }}
                  </div>
                </div>
              </div>
            </div>

            <div class="text-sm text-white/50">
              <a href="#" class="inline-flex items-center gap-2 transition hover:text-white">
                показать все статьи <span class="text-brand-red">>></span>
              </a>
            </div>
          </div>

          <!-- BOTTOM-LEFT (disclaimer) -->
          <div class="pt-4 text-xs text-white/40">
            Обратите внимание: представленная на данной странице информация, включая стоимость
            услуг, сроки ремонта и условия гарантии, носит информационный характер и не является
            публичной офертой.
          </div>

          <!-- BOTTOM-RIGHT (copyright + policy) -->
          <div class="pt-4 text-sm text-white/50">
            <div>
              Ремонт коробок передач АКПП<span class="text-brand-red">ЦЕНТР+</span> | Все права
              защищены © 2026
            </div>
            <a href="#" class="mt-2 inline-block underline transition hover:text-white">
              Политика обработки персональных данных
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const brands: string[] = [
  '/images/brands/1.png',
  '/images/brands/2.png',
  '/images/brands/3.png',
  '/images/brands/4.png',
  '/images/brands/5.png',
  '/images/brands/6.png',
  '/images/brands/7.png',
  '/images/brands/8.png',
  '/images/brands/9.png',
  '/images/brands/10.png',
  '/images/brands/11.png',
  '/images/brands/12.png',
]

const menu: string[] = [
  'Главная',
  'Определить АКПП',
  'Коробки передач',
  'Полезные статьи',
  'Контакты',
  'Ремонт вариаторов',
  'Ремонт DSG',
  'Ремонт гидроблока',
  'Диагностика АКПП',
  'Замена масла в АКПП',
]

type Article = {
  title: string
  date: string
  image: string
}

const articles: Article[] = [
  {
    title: 'Как менять масло в АКПП: полная или частичная замена',
    date: '27.01.2026',
    image: '/images/articles/article1.png',
  },
  {
    title: 'Сброс, калибровка и адаптация АКПП',
    date: '20.01.2026',
    image: '/images/articles/article2.png',
  },
]
</script>
