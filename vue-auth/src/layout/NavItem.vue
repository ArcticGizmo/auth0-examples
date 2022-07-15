<template>
  <div class="nav-item">
    <Icon :icon="props.icon" />
    <span class="nav-bar-tooltip"> {{ props.name }} </span>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: String,
  name: String,
});
</script>

<style>
.nav-item {
  position: relative;
  display: flex;
  justify-content: center;
}

.nav-item .icon {
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  margin: 0.5rem;
  padding: 0.5rem;
  color: #3fb27f;
  background-color: #2f3136;
  border-radius: 2rem;
  transition: all 0.3s;
}

.router-link-active .nav-item .icon,
.nav-item:hover .icon {
  color: white;
  border-radius: 0.75rem;
  background-color: #3fb27f;
}

.nav-item .nav-bar-tooltip {
  font-size: 0.9rem;
  font-weight: bold;
  position: absolute;
  left: 4.5rem;
  top: 1.25rem;
  padding: 0.5rem;
  color: white;
  background-color: #202225;
  border-radius: 0.75rem;
  transform: scale(0);
  transform-origin: left;
  transition: transform 0.15s;
  white-space: nowrap;
}

.nav-item:hover .nav-bar-tooltip {
  transform: scale(1);
}
</style>