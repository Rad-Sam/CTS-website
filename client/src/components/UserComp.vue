<template>
  <q-item
    class="q-my-sm q-pa-sm"
    clickable
    v-if="global.isAuthenticated"
    style="border: 2px solid black; border-radius: 10px"
  >
    <q-menu v-if="!$q.screen.lt.md" style="min-width: auto">
      <UserCompList />
    </q-menu>
    <q-item-section class="text-center">
      <q-item-label
        >{{ global.user?.first_name }}
        {{ global.user?.last_name }}</q-item-label
      >
      <q-item-label caption>{{ global.user?.email }}</q-item-label>
    </q-item-section>
  </q-item>
  <UserCompList v-if="$q.screen.lt.md && global.isAuthenticated" />
  <div class="text-center text-bold justify-center q-my-sm">
    <q-btn
      icon="fas fa-user"
      class="q-ml-sm"
      flat
      v-if="!global.isAuthenticated"
      color="white"
      :to="{ name: 'login' }"
      text-color="black"
      rounded
    />
  </div>
</template>

<script setup>
import { useGlobalStore } from '../stores/global';
import UserCompList from './UserCompList.vue';
import { api } from '../const';
let global = useGlobalStore();
</script>

<style scoped></style>
