<template>
  <q-header
    style="background-image: url('images/greenback.jpg')"
    elevated
    class="text-black"
  >
    <q-toolbar class="max-width-container-2">
      <span class="text-bold text-center">
        <span class="text-green">C</span>TS
        <br />
        <span class="text-green">S</span>ETIF
      </span>
      <q-space></q-space>
      <div>
        <NavLinks></NavLinks>
      </div>
      <q-space></q-space>
      <UserComp v-if="$q.screen.gt.sm" />
      <q-btn
        v-if="$q.screen.lt.sm && !global.isAuthenticated"
        size="md"
        :to="{ name: 'user' }"
        color="green-9"
      >
        تبرع
      </q-btn>
      <q-btn
        v-if="$q.screen.lt.md"
        dense
        flat
        round
        size="sm"
        class="q-mx-sm"
        icon="fas fa-bars"
        @click="global.mobileDrawer = true"
      />
    </q-toolbar>
  </q-header>

  <q-drawer v-model="global.mobileDrawer" side="left" overlay elevated>
    <!-- drawer content -->
    <DrawerLinks />

    <UserComp />
  </q-drawer>
  <q-page-container style="background-image: url('images/greenback.jpg')">
    <router-view />
    <footerComp
      style="background-image: url('images/greenback.jpg')"
      class="q-mt-xl"
    />
  </q-page-container>
</template>

<script setup>
import { useQuasar } from 'quasar';
import UserComp from 'components/UserComp.vue';
import DrawerLinks from 'components/DrawerLinks.vue';
import NavLinks from 'components/NavLinks.vue';
import footerComp from 'components/footerComp.vue';
import { useGlobalStore } from '../stores/global';
import { useRouter } from 'vue-router';
const $router = useRouter();
const $q = useQuasar();
const global = useGlobalStore();
</script>

<style></style>
