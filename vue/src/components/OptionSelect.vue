<template>
  <span class="option-select" @click="onToggle">
    {{ name }} <input type="checkbox" :checked="selected" @change="onToggle" />
  </span>
</template>

<script setup>
defineProps({
  name: String,
  selected: Boolean,
});

const emit = defineEmits(['toggle']);

const onToggle = () => {
  emit('toggle');
};
</script>

<style scoped>
.option-select {
  cursor: pointer;
  height: 2rem;
  line-height: 2rem;
  border: 1px solid gray;
  background-color: rgb(245, 245, 245);
  border-radius: 10px;
  margin: 0.25rem;
  padding: 0 0.5rem;
  user-select: none;
}

input {
  pointer-events: none;
}
</style>
