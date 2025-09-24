<script setup>
const props = defineProps({
  count: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <div class="counter">
    <label>
      <slot></slot>
    </label>
    <strong class="count">{{ count }}</strong>
  </div>
</template>

<style lang="css">
  .counter {
    padding: 5px;
  }

  .counter label {
    display: block;
    font-size: .75em;
  }
</style>