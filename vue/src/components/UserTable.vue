<template>
  <table class="user-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Connection</th>
        <th>Logins</th>
        <th>Latest Login</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="index">
        <td class="user">
          <Avatar :src="user.picture" />
          <div>
            <div class="nickname">{{ user.nickname }}</div>
            <div class="email">{{ user.email }}</div>
          </div>
        </td>
        <td>{{ user.identities[0].connection }}</td>
        <td>{{ user.logins_count }}</td>
        <td>{{ toDuration(user.last_login) }}</td>
        <td class="action">
          <Icon icon="edit" @click="onEdit(user)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { watch } from '@vue/runtime-core';
import humanizeDuration from 'humanize-duration';
import Avatar from './Avatar.vue';

const now = Date.now();

defineProps({
  users: { type: Array, default: () => [] },
});

const emit = defineEmits(['edit']);

const toDuration = date => {
  date = new Date(date);
  if (!date) {
    return '--';
  }

  const humanText = humanizeDuration(now - date.getTime(), { largest: 1 });
  return `${humanText} ago`;
};

const onEdit = user => {
  emit('edit', user);
};
</script>

<style scoped>
table {
  margin: 0 auto;
  width: 750px;
  border: 1px solid orange;
  border-collapse: collapse;
}

tr {
  height: 4rem;
  border-bottom: 1px solid gray;
}

td {
  padding: 0.75rem;
}

.user {
  display: grid;
  grid-template-columns: 3rem auto;
  min-width: 250px;
}

.nickname {
  font-weight: bold;
  padding-bottom: 0.25rem;
}

.email {
  font-size: 0.75rem;
}

.icon:hover {
  cursor: pointer;
  opacity: 0.5;
}
</style>
