<template>
  <div class="options-grid">
    <OptionSelect
      v-for="(option, index) in parsedOptions"
      :key="index"
      :name="option.name"
      :selected="option.selected"
      @toggle="onToggle(option.name)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import OptionSelect from './OptionSelect.vue';

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  options: { type: Array, default: () => [] },
});

const emit = defineEmits(['update:modelValue']);

const parsedOptions = computed(() => {
  return props.options.map(o => {
    return {
      name: o,
      selected: props.modelValue.includes(o),
    };
  });
});

const onToggle = name => {
  let payload = props.modelValue.slice();
  if (payload.includes(name)) {
    payload = payload.filter(p => p !== name);
  } else {
    payload.push(name);
  }

  emit('update:modelValue', payload);
};
</script>

<style scoped>
.options-grid {
  display: flex;
}
</style>
