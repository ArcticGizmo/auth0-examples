import { createWebHistory, createRouter } from 'vue-router';
import { authGuard } from '@auth0/auth0-vue';

import HomePage from '../pages/HomePage.vue';
import ProfilePage from '../pages/ProfilePage.vue';
import SecurePage from '../pages/SecurePage.vue';
import UserManagementPage from '../pages/UserManagementPage.vue';

const publicRoutes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
];

const protectedRoutes = [
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
  },
  {
    path: '/secure',
    name: 'Secure',
    component: SecurePage,
  },
  {
    path: '/user-management',
    name: 'UserManagement',
    component: UserManagementPage,
  },
];

protectedRoutes.forEach(r => (r.beforeEnter = authGuard));

const routes = publicRoutes.concat(protectedRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export const navRoutes = [
  { to: 'Home', title: 'Home', icon: 'home' },
  { to: 'Secure', title: 'Secure', icon: 'shield' },
  { to: 'UserManagement', title: 'User Management', icon: 'people-roof', visibleWithAuth: true },
];

export default router;
