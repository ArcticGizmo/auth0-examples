<template>
  <vue-final-modal v-slot="{ close }">
    <div class="header">Header</div>
    <div class="permissions"></div>
    <button @close="close">Close</button>
  </vue-final-modal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal';

defineProps({ user: { type: Object, required: true } });
</script>
