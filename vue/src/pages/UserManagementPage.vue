<template>
  <div class="user-management-page">
    This is the user management page

    <div><button @click="onGetUsers">Get Users</button></div>
    <div class="users">
      <pre>{{ users }}</pre>
    </div>
  </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import { ref } from 'vue';
import API from '../code/api';

const { getAccessTokenSilently } = useAuth0();

const users = ref([]);

const onGetUsers = async () => {
  const token = await getAccessTokenSilently();
  API.userManagement
    .getUsers(token)
    .then(d => (users.value = d))
    .catch(e => console.error(e));
};
</script>
