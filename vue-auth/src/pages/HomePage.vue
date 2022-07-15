<template>
  <div class="home-page">
    This is the home page
    <br>
    <div>Access Token</div>
    <code>{{ token }}</code>
    <br>
    <div>Id Token Claims</div>
    <pre>{{ idTokenClaims }}</pre>
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
import { useAuth0 } from '@auth0/auth0-vue';
import API from '../code/api';
const { getAccessTokenSilently, idTokenClaims } = useAuth0();

const token = ref(null);

getAccessTokenSilently()
  .then(resp => (token.value = resp))
  .catch(error => console.error(error));

const onCallPublicApi = () => {
  API.getPublic()
    .then(resp => console.dir(resp))
    .catch(e => console.error(e));
};

const onCallPrivateApi = () => {
  API.getPrivate(token.value)
    .then(resp => console.dir(resp))
    .catch(e => console.error(e));
};

const onCallPrivateScopedApi = () => {
  API.getPrivateScoped(token.value)
    .then(resp => console.dir(resp))
    .catch(e => console.error(e));
};
</script>

<style scoped>
button {
  margin: 1rem 0;
}
</style>
