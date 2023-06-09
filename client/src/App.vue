<template>
  <q-layout view="lHr lpR lfr">
    <div v-if="isLoading" class="loading-container">
      <q-spinner size="120" color="green-10" />
      <div class="loading-text text-center">{{ LoadingText }}</div>
    </div>
    <router-view v-else />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { directusPublic } from './services/api';
import errorDialog from './utils/error';
import { directus } from './services/api';
import { useGlobalStore } from './stores/global';
import { ExtendedUserType } from './types/user';
import { api } from './const';

export default defineComponent({
  name: 'App',
  data: function () {
    return {
      isLoading: true,
      api: api,
      LoadingText: 'تحميل ...',
    };
  },
  methods: {
    async load() {
      const globalStore = useGlobalStore();
      try {
        let data: any = await directusPublic.graphql.items(`query MyQuery {
  global {
    maintenance
    allow_new_users
  }
}`);
        if (data.data.global.maintenance) {
          this.$router.push('Maintenance');
        } else if (this.$router.currentRoute.value.name == 'Maintenance') {
          this.$router.push('/');
        }
        globalStore.global.maintenance = data.data.global.maintenance;
        globalStore.global.allow_new_users = data.data.global.allow_new_users;

        this.LoadingText = 'تحميل بيانات المستخدم';
        try {
          let user = await directus.users.me.read();
          globalStore.user = user as ExtendedUserType;
          globalStore.isAuthenticated = true;
        } catch (er) {}
        this.isLoading = false;
      } catch (error: any) {
        this.isLoading = false;
        errorDialog(error.message, '');
      }
    },
  },
  mounted() {
    this.load();
    setInterval(() => {
      this.load();
    }, 180000);
  },
});
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  background-color: #201f22;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.loading-text {
  margin-top: 20px;
  font-size: 18px;
  color: rgb(255, 255, 255);
  font-weight: bold;
}
</style>
