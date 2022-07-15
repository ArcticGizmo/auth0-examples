<template>
  <div class="home-page">
    This is the home page

    <div>token</div>
    <div>{{ token }}</div>
    <div>
      <button @click="onCallPublicApi">Call Public</button>
    </div>
    <div>
      <button v-if="token" @click="onCallPrivateApi">Call Private</button>
    </div>
    <div>
      <button v-if="token" @click="onCallPrivateScopedApi">Call Private Scoped</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-vue';
const { getAccessTokenSilently } = useAuth0();

const token = ref(null);

getAccessTokenSilently()
  .then(resp => (token.value = resp))
  .catch(error => console.error(error));

const onCallPublicApi = () => {
  axios
    .get('http://localhost:4000/public')
    .then(resp => {
      console.dir(resp);
    })
    .catch(e => console.error(e));
};

const onCallPrivateApi = () => {
  axios
    .get('http://localhost:4000/private')
    .then(resp => {
      console.dir(resp);
    })
    .catch(e => console.error(e));
};

const onCallPrivateScopedApi = () => {
  axios
    .get('http://localhost:4000/private')
    .then(resp => {
      console.dir(resp);
    })
    .catch(e => console.error(e));
};
</script>

<style scoped>
button {
  margin: 1rem 0;
}
</style>
