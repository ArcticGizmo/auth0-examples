<template>
  <div id="app">
    <Layout :routes="navRoutes" />
    <ModalsContainer />
  </div>
</template>

<script setup>
import Layout from './layout/Layout.vue';
import { navRoutes } from './code/router';
import { ModalsContainer } from 'vue-final-modal';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

button {
  cursor: pointer;
  min-width: 4rem;
  height: 1.5rem;
  background-color: #877aff;
  box-shadow: none;
  border: none;
  border-radius: 3px;
  color: whitesmoke;
  user-select: none;
}

button:hover:not(:disabled) {
  opacity: 0.9;
}

button:disabled {
  cursor: default;
  pointer-events: none;
  background-color: #b3aaff;
}
</style>
