<template>
  <div class="layout">
    <div class="nav-bar">
      <img src="logo.svg" />
      <router-link v-for="route in routes" :key="route.path" :to="route.path">
        <NavItem :name="route.name" :icon="route.meta.icon" />
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

import NavItem from './NavItem.vue';
import LoginHeader from './LoginHeader.vue';

import router from '../code/router';

// TODO: change this to take in a list of route names for display
const routes = computed(() => router.getRoutes().filter(r => !r.meta.hide));
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
