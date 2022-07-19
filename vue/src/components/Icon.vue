<template>
  <FontAwesomeIcon
    class="icon"
    :class="{ invalid: !completeIcon, hidden: !props.icon }"
    :icon="completeIcon || ['fas', 'cancel']"
  />
</template>

<script setup>
import { computed } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import * as allIcons from '../code/icons.js';

function pascalToDashCase(s) {
  return s.replace(/(?:^|\.?)([A-Z])/g, (x, y) => '-' + y.toLowerCase()).replace(/^-/, '');
}

const ICONS = Object.entries(allIcons).map(([key, icon]) => {
  // trim leading 'fas' etc
  var match = /[A-Z]/.exec(key);
  const str = key.slice(match.index);
  icon.iconName = pascalToDashCase(str);
  return icon;
});

const LOOKUP = ICONS.reduce((acc, icon) => {
  acc[icon.iconName] = icon;
  return acc;
}, {});

// add icons
library.add(...ICONS);

const props = defineProps({
  icon: String,
});

const completeIcon = computed(() => {
  if (!props.icon) {
    return;
  }

  const icon = LOOKUP[props.icon];

  if (!icon) {
    console.error(
      `[Icon] Cannot find icon '${props.icon}'. Has it been imported? See /code/icons.js`,
    );
    return;
  }

  return [icon.prefix, icon.iconName];
});
</script>

<style>
svg.icon.svg-inline--fa {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.icon.invalid {
  color: red;
}

.icon.hidden {
  opacity: 0;
}
</style>
