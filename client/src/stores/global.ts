import { defineStore } from 'pinia';
import { UserType } from '@directus/sdk';
import { directus } from '../services/api';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    global: {
      maintenance: false,
      allow_new_users: false,
    },
    isAuthenticated: false,
    profileDialog: false,
    user: null as UserType | null,
    mobileDrawer: false,
    loginDialog: false,
    vipDialog: false,
    reviews: [],
    news: [],
  }),
  actions: {
    async logout() {
      try {
        await directus.auth.logout();
      } catch (e) {}
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
