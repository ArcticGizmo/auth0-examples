<template>
  <AsyncPage :loading="loading">
    <ErrorHandler :error="error">
      <div v-if="!user" class="no-user">User not found</div>
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
        <div class="permissions">
          <OptionsGrid v-model="selectedPermissions" :options="permissions" />
        </div>
        <div class="actions">
          <button :disabled="!canReset" @click="onReset">Reset</button>
          <button @click="onSave">Save</button>
        </div>
      </div>
    </ErrorHandler>
  </AsyncPage>
</template>

<script setup>
import { computed, ref } from 'vue';

import AsyncPage from './AsyncPage.vue';
import ErrorHandler from '@/errors/ErrorHandler.vue';
import Avatar from '../components/Avatar.vue';

import API from '@/code/api';
import OptionsGrid from '../components/OptionsGrid.vue';

function uniq(arr) {
  return [...new Set(arr)].sort();
}

const { userId } = defineProps({
  userId: String,
});

const loading = ref(true);
const error = ref(null);
const user = ref(null);
const selectedPermissions = ref([]);
const permissions = ref([]);

const canReset = computed(() => {
  const sortedPerms = uniq(permissions.value);
  const sortedSelectedPerms = uniq(selectedPermissions.value);
  return (
    sortedPerms.length !== sortedSelectedPerms.length ||
    !sortedSelectedPerms.every(p => sortedPerms.includes(p))
  );
});

const onReset = () => {
  selectedPermissions.value = permissions.value.slice();
};

const onSave = async () => {
  const resp = await API.userManagement.setUserPermissions(
    user.value.user_id,
    selectedPermissions.value,
  );
};

Promise.all([API.userManagement.getUser(userId), API.userManagement.getPermissions()])
  .then(([userData, permissionData]) => {
    user.value = userData;
    selectedPermissions.value = userData.permissions;
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

.permissions {
  margin-top: 0.5rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.actions > * {
  margin-left: 0.25rem;
}
</style>
