import { createWebHistory, createRouter } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import ProfilePage from '../pages/ProfilePage.vue';

const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: {
      hide: true,
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: {
      icon: 'house',
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: {
      icon: 'user',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
