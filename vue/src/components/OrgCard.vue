<template>
  <div class="org-card">
    <div class="left">
      <Avatar :src="org.branding.logo_url" />
    </div>
    <div class="right">
      <div class="name">{{ org.display_name }}</div>
      <div class="id">
        ID: <code>{{ org.id }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import Avatar from './Avatar.vue';
const { org } = defineProps({
  org: { type: Object, required: true },
});
</script>

<style>
.org-card .avatar {
  height: 3rem;
  width: 3rem;
}

.org-card .avatar img {
  border-radius: 0;
}
</style>

<style scoped>
.org-card {
  display: grid;
  grid-template-columns: 3rem auto;
  width: 250px;
  height: 5rem;
  border: 1px solid orange;
  justify-content: space-evenly;
  align-items: center;
  margin: 1rem;
  border: 1px solid rgb(190, 190, 190);
  background-color: rgb(247, 247, 247);
  border-radius: 15px;
  transition: transform 0.1s;
}

.org-card:hover {
  transform: scale(1.05);
}

code {
  background: rgba(128, 128, 128, 0.103);
  padding: 0.25rem;
}

.name {
  font-size: 1.75rem;
  text-align: center;
  padding-bottom: 0.5rem;
}

.id {
  font-size: 0.75rem;
}
</style>
