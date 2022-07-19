<template>
  <AsyncPage :loading="loading">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="!user" class="no-user">User not found</div>
    <div v-else class="user-page">
      <div class="heading">
        <Avatar :src="user.picture" />
        <div class="text">
          <div class="email">{{ user.email }}</div>
          <div class="user-id">
            user_id: <code>{{ user.user_id }}</code>
          </div>
        </div>
      </div>
    </div>
    <div class="permissions"></div>
    <pre>{{ permissions }}</pre>
  </AsyncPage>
</template>

<script setup>
import { ref } from 'vue';

import AsyncPage from './AsyncPage.vue';
import Avatar from '../components/Avatar.vue';

import API from '@/code/api';

const { userId } = defineProps({
  userId: String,
});

const loading = ref(true);
const error = ref(null);
const user = ref(null);
const permissions = ref([]);

Promise.all([API.userManagement.getUser(userId), API.userManagement.getPermissions()])
  .then(([userData, permissionData]) => {
    user.value = userData;
    permissions.value = permissionData;
  })
  .catch(e => (error.value = e))
  .finally(() => (loading.value = false));
</script>

<style scoped>
.user-page {
  width: 750px;
  margin: 0 auto;
}

.heading {
  display: grid;
  grid-template-columns: 8rem auto;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgb(190, 190, 190);
}

.heading .avatar {
  width: 6rem;
  height: 6rem;
}

.heading .text {
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
}

.heading .email {
  font-size: 1.75rem;
  font-weight: bold;
}

.heading .text > * {
  padding: 0.25rem;
}

code {
  background: rgba(128, 128, 128, 0.103);
  padding: 0.25rem;
}
</style>
