<template>
  <div class="user-management-page">
    This is the user management page

    <div><button @click="onGetUsers">Get Users</button></div>
  </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import API from '../code/api';

const { getAccessTokenSilently } = useAuth0();

const onGetUsers = async () => {
  const token = await getAccessTokenSilently();
  API.userManagement
    .getUsers(token)
    .then(d => console.dir(d))
    .catch(e => console.error(e));
};
</script>
