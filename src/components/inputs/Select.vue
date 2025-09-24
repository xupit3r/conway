<script setup>
import { inject } from "vue";

const { name } = defineProps([
  'type',
  'name',
  'value',
  'placeholder',
  'id',
  'required',
  'min',
  'max',
  'maxlength',
  'options'
]);

const save = inject('save');

const doSave = (ev) => {
  const target = ev.target;
  
  if (save) {
    save(name, target.value);
  }
}
</script>

<template>
  <select :id="id" :name="name" @change="doSave">
    <option v-if="placeholder">{{ placeholder }}</option>
    <option v-for="option in options" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>