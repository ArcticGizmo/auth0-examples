<template>
  <div class="login-header">
    <button v-if="!isAuthenticated" @click="loginWithRedirect">Log In</button>
    <Avatar :src="user.picture" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';

import Avatar from '../components/Avatar.vue';

const img = ref('default-avatar.png');

const router = useRouter();

const { loginWithRedirect, isAuthenticated, user } = useAuth0();

const onToProfile = () => {
  router.push({ name: 'Profile' });
};
</script>

<style scoped>
.login-header {
  display: flex;
  height: 100%;
  justify-content: right;
  align-items: center;
}

button {
  width: 5rem;
  height: 2rem;
  margin: 0.25rem;
}

object,
img {
  cursor: pointer;
  height: 3rem;
  width: 3rem;
  border-radius: 100%;
}
</style>
