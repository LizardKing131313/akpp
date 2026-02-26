<script setup lang="ts">
type AccordionItem = {
  id: string
  title: string
  content: string
}

withDefaults(defineProps<{ items?: AccordionItem[] }>(), {
  items: () => [
    {
      id: '1',
      title: 'Приблизительные сроки ремонта АКПП?',
      content: 'Текст',
    },
    {
      id: '2',
      title: 'Как понять, что АКПП нуждается в ремонте?',
      content: 'Текст',
    },
    {
      id: '3',
      title: 'Как проводится диагностика АКПП?',
      content: 'Текст',
    },
    {
      id: '4',
      title: 'Этапы ремонта АКПП',
      content: 'Текст',
    },
    {
      id: '5',
      title: 'Ремонт или покупка контрактной АКПП: Что выбрать?',
      content: 'Текст',
    },
    {
      id: '6',
      title: 'Как работает гарантия?',
      content: 'Текст',
    },
    {
      id: '7',
      title: 'Какие формы оплаты?',
      content: 'Текст',
    },
    {
      id: '8',
      title: 'Вы работаете с Юр. лицами?',
      content: 'Текст',
    },
    {
      id: '9',
      title: 'Как воспользоваться бесплатным эвакуатором?',
      content: 'Текст',
    },
    {
      id: '10',
      title: 'Чем мы отличаемся от других сервисов?',
      content: 'Текст',
    },
  ],
})
</script>

<template>
  <div class="space-y-4">
    <AccordionItem
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :content="item.content" />
  </div>
</template>
