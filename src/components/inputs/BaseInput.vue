<script setup lang="ts">
import { inject } from 'vue';

const { type, id, name, value, placeholder, required, min, max, maxlength } = defineProps([
  'type',
  'name',
  'value',
  'placeholder',
  'id',
  'required',
  'min',
  'max',
  'maxlength'
]);

const save: Function | undefined = inject('save');

const doSave = (ev: Event) => {
  const target = ev.target as HTMLInputElement;
  
  if (save) {
    save(name, target.value);
  }
}

</script>

<template>
  <input :type="type" 
         :name="name"
         :value="value"
         :id="id"
         :placeholder="placeholder"
         :required="required"
         :min="min"
         :max="max"
         :maxlength="maxlength"
         @change="doSave" />
</template>

<style lang="css" scoped>
</style>