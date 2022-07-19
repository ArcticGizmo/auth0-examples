<template>
  <div class="profile-page">
    <strong>Welcome to to the profile page. This is everything we know about you</strong>
    <pre>{{ user }}</pre>
    <br />
    <div>Claims</div>
    <code>{{ idTokenClaims }}</code>
    <br />
    <div>Token</div>
    <code>{{ token }}</code>
  </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import { ref } from 'vue';
const { user, idTokenClaims, getAccessTokenSilently } = useAuth0();

const token = ref(null);

getAccessTokenSilently()
  .then(resp => (token.value = resp))
  .catch(error => console.error(error));
</script>
