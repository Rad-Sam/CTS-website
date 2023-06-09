<template>
  <q-item
    clickable
    v-for="(item, index) in drawerItems"
    active-class=""
    :key="index"
    :to="item.link"
  >
    <q-item-section class="text-center">
      <q-item-label>
      <q-icon :name="item.icon" />
        {{ item.label }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
let { t } = useI18n();
const drawerItems = [
  {
    label: t('home'),
    icon: 'fas fa-home',
    link: '/',
  },
  {
    label: t('f-a-q'),
    icon: 'fas fa-question-circle',
    link: '/faq',
  },
  {
    label: t('news'),
    icon: 'fas fa-newspaper',
    link: '/news',
  },
  {
    label: 'بحاجة الى الدم',
    icon: 'fas fa-hospital',
    link: '/need-blood',
  },
  {
    label: t('contact-us'),
    icon: 'fas fa-envelope',
    link: '/contact',
  },
];
</script>
