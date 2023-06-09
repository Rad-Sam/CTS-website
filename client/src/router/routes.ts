import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      { path: 'faq', component: () => import('src/pages/faqPage.vue') },
      { path: 'contact', component: () => import('src/pages/contactPage.vue') },
      { path: 'dashboard', component: () => import('src/pages/dashboardPage.vue') },
      { path: 'need-blood', component: () => import('src/pages/needPage.vue') },
      {
        path: 'user',
        name: 'user',
        component: () => import('src/pages/AuthenticationPage.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('src/pages/loginPage.vue'),
      },
      { path: 'news', component: () => import('src/pages/newsPage.vue') },
      {
        path: 'read/:id',
        component: () => import('src/pages/singleNews.vue'),
      },
    ],
  },
  {
    path: '/Maintenance',
    name: 'Maintenance',
    component: () => import('pages/MaintenancePage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
