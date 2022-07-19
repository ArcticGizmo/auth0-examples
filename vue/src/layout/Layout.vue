<template>
  <div class="layout">
    <div class="nav-bar">
      <img :src="logo" />
      <router-link v-for="route in visibleRoutes" :key="route.to" :to="{ name: route.to }">
        <NavItem :name="route.title" :icon="route.icon" />
      </router-link>
    </div>

    <header><LoginHeader /></header>

    <div class="page-wrapper">
      <div class="page">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import logo from '@/assets/logo.svg';

import NavItem from './NavItem.vue';
import LoginHeader from './LoginHeader.vue';

const props = defineProps({
  routes: { type: Array, default: () => [] },
});

const { isAuthenticated } = useAuth0();

const visibleRoutes = computed(() => {
  const isAuthed = isAuthenticated.value;
  if (isAuthed) {
    return props.routes;
  }

  return props.routes.filter(r => r.visibleWithAuth !== true);
});
</script>

<style>
body {
  margin: 0;
}

.layout {
  color: black;
}

.layout .nav-bar {
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 4rem;
  background-color: #202225;
  height: 100vh;
  z-index: 1000;
}

.layout .nav-bar img {
  border-bottom: 1px solid gray;
  border-right: 1px solid gray;
  padding: 0.5rem;
}

.layout .page-wrapper {
  margin-left: 4rem;
}

.layout .page {
  margin: 1rem;
  padding-top: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 0.1px solid gray;
}

.layout header {
  margin-left: 4rem;
  padding: 0 2rem;
  height: 4rem;
  background-color: #202225;
}
</style>
