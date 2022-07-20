<template>
  <ErrorHandler :error="error">
    <div class="user-management-page">
      <UserTable :users="users" @edit="onEdit" />
      <div class="refresh"><button @click="onGetUsers">Refresh</button></div>
    </div>
  </ErrorHandler>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import API from '../code/api';

import UserTable from '@/components/UserTable.vue';
import ErrorHandler from '../errors/ErrorHandler.vue';

const router = useRouter();

const error = ref();
const users = ref([]);

const onGetUsers = async () => {
  API.userManagement
    .getUsers()
    .then(d => (users.value = d))
    .catch(e => (error.value = e));
};

onMounted(() => {
  onGetUsers();
});

const onEdit = async user => {
  router.push(`/user-management/${user.user_id}`);
};
</script>

<style scoped>
.user-management-page {
  width: 750px;
  margin: 0 auto;
}

.refresh {
  margin: 0.25rem;
  display: flex;
  justify-content: flex-end;
}
</style>
