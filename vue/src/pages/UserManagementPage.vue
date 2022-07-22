<template>
  <ErrorHandler :error="error">
    <div class="user-management-page">
      <div class="users">
        <UserTable :users="users" @edit="onEdit" />
        <div class="refresh"><button @click="onGetUsers">Refresh</button></div>
      </div>
      <div class="organizations">
        <OrgCard v-for="(org, index) in orgs" :key="index" :org="org" />
      </div>
      <div class="refresh"><button @click="onGetOrgs">Refresh</button></div>
    </div>
  </ErrorHandler>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import API from '../code/api';

import UserTable from '@/components/UserTable.vue';
import ErrorHandler from '../errors/ErrorHandler.vue';
import OrgCard from '../components/OrgCard.vue';

const router = useRouter();

const error = ref();
const users = ref([]);
const orgs = ref([]);

const onGetUsers = async () => {
  API.userManagement
    .getUsers()
    .then(d => (users.value = d))
    .catch(e => (error.value = e));
};

const onGetOrgs = async () => {
  const resp = await API.userManagement.getOrganizations();
  orgs.value = resp;
};

onMounted(() => {
  onGetUsers();
  onGetOrgs();
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

.organizations {
  display: flex;
  flex-wrap: wrap;
}
</style>
