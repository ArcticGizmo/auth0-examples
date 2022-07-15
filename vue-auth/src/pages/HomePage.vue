<template>
  <div class="home-page">
    This is the home page

    <div>token</div>
    <div>{{ token }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
const { getAccessTokenSilently } = useAuth0();

const token = ref(null);

getAccessTokenSilently()
  .then(resp => (token.value = resp))
  .catch(error => console.error(error));
</script>
