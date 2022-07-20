<template>
  <div class="home-page">This is the home page and there isnt much to do here</div>
  <button @click="onClick">Click</button>
  <button @click="onToast">Create toast</button>
</template>

<script setup>
import { $vfm } from 'vue-final-modal';
import ExampleModal from '@/modals/ExampleModal.vue';

import { useToaster } from '@/code/toaster';

const toaster = useToaster();

const onClick = async () => {
  await $vfm.show({ component: ExampleModal });
};

const onToast = () => {
  toaster.show('This is a message');
};
</script>
