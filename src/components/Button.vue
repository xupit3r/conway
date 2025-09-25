<script setup>
const props = defineProps({
  id: {
    type: String,
    default: `${Math.floor(Math.random() * 10000)}`
  }
});
</script>

<template>
  <div class="buttonGroup">
    <button :id="id">
      <slot></slot>
    </button>
  </div>
</template>

<style lang="css" scoped>
.buttonGroup {
  display: flex;
  flex-direction: column-reverse;
  padding: 3px;
  line-height: 1.1em;
}

button {

}
</style>