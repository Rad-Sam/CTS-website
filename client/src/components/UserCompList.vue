<template>
  <q-list>
    <q-item @click="$router.push('/dashboard')" clickable v-close-popup>
      <q-item-section avatar>
        <q-icon name="fas fa-user-circle" />
      </q-item-section>
      <q-item-section>ملفي الشخصي</q-item-section>
    </q-item>
    <q-item
      clickable
      @click="
        () => {
          global.logout();
        }
      "
      v-close-popup
    >
      <q-item-section avatar>
        <q-icon name="fas fa-sign-out-alt" />
      </q-item-section>
      <q-item-section>تسجيل الخروج</q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { useGlobalStore } from '../stores/global';
let global = useGlobalStore();
</script>
