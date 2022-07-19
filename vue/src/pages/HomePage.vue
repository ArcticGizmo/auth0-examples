<template>
  <div class="home-page">This is the home page and there isnt much to do here</div>
  <button @click="onClick">Click</button>
</template>

<script setup>
import { $vfm } from 'vue-final-modal';
import ExampleModal from '@/modals/ExampleModal.vue';

const onClick = async () => {
  console.dir('---- on click');
  await $vfm.show({ component: ExampleModal });
};
</script>
