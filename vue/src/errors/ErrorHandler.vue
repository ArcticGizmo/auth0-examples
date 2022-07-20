<template>
  <div class="error-handler">
    <div v-if="isUnauthorized" class="unauthorized">
      <Icon icon="lock" />
      <div>Unauthorized</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from '@vue/runtime-core';

const { error } = defineProps({
  error: Object,
});

const isUnauthorized = computed(() => {
  try {
    return error.response.status === 403;
  } catch {
    return false;
  }
});
</script>

<style scoped>
.error-handler {
  margin: 60px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.unauthorized {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.icon {
  color: #877aff;
  height: 3rem;
  width: 3rem;
}
</style>
