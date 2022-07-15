import { createWebHistory, createRouter } from 'vue-router';
import { authGuard } from '@auth0/auth0-vue';

import HomePage from '../pages/HomePage.vue';
import ProfilePage from '../pages/ProfilePage.vue';
import SecurePage from '../pages/SecurePage.vue';

const publicRoutes = [
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
];

const protectedRoutes = [
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: {
      hide: true,
    },
  },
  {
    path: '/secure',
    name: 'Secure',
    component: SecurePage,
    meta: {
      icon: 'shield',
    },
  },
];

protectedRoutes.forEach(r => (r.beforeEnter = authGuard));

const routes = publicRoutes.concat(protectedRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
