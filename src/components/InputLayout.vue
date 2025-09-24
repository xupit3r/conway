<script setup>
import { reactive } from 'vue';

const { horizontal } = defineProps({
  horizontal: {
    type: Boolean,
    default: false
  }
});

const classes = reactive({
  horizontal: horizontal
});
</script>

<template>
  <div class="inputLayout" :class="classes">
    <slot></slot>
  </div>
</template>

<style lang="css" scoped>
.inputLayout {
  display: flex;
  flex-direction: column;
}

.inputLayout.horizontal {
  flex-direction: row;
}
</style>
