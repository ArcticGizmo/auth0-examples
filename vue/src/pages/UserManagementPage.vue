<template>
  <div class="user-management-page">
    This is the user management page

    <div><button @click="onGetUsers">Get Users</button></div>
    <UserTable :users="users" @edit="onEdit" />
  </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import { onMounted, ref } from 'vue';
import API from '../code/api';

import UserTable from '@/components/UserTable.vue';

const { getAccessTokenSilently } = useAuth0();

const users = ref([]);

const onGetUsers = async () => {
  const token = await getAccessTokenSilently();
  API.userManagement
    .getUsers(token)
    .then(d => (users.value = d))
    .catch(e => console.error(e));
};

onMounted(() => {
  onGetUsers();
});

const onEdit = () => {
  console.log('--- on edit');
};
</script>
