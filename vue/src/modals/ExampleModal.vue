<template>
  <vue-final-modal v-slot="{ close }">
    <div class="title">This is a title</div>
    This is something
    <button @click="close('apples')">Close</button>
  </vue-final-modal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal';
</script>
