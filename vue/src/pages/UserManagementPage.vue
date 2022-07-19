<template>
  <div class="user-management-page">
    This is the user management page

    <div><button @click="onGetUsers">Get Users</button></div>
    <UserTable :users="users" @edit="onEdit" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import API from '../code/api';

import UserTable from '@/components/UserTable.vue';

const router = useRouter();

const users = ref([]);

const onGetUsers = async () => {
  API.userManagement
    .getUsers()
    .then(d => (users.value = d))
    .catch(e => console.error(e));
};

onMounted(() => {
  onGetUsers();
});

const onEdit = async user => {
  router.push(`/user-management/${user.user_id}`);
};
</script>
