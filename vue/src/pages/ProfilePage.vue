<template>
  <div class="profile-page">
    <strong>Welcome to to the profile page. This is everything we know about you</strong>
    <pre>{{ user }}</pre>
  </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
const { user } = useAuth0();
</script>
