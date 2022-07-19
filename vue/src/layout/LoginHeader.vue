<template>
  <div class="login-header">
    <button v-if="!isAuthenticated" @click="loginWithRedirect">Log In</button>
    <template v-else>
      <Avatar :src="(user || {}).picture" @click="onToProfile" />
      <button @click="logout">Log Out</button>
    </template>
  </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';

import Avatar from '../components/Avatar.vue';

const router = useRouter();

const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

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

.avatar {
  cursor: pointer;
}
</style>
