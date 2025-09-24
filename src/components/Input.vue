<script setup>
import { computed, provide } from 'vue';

import Text from '@/components/inputs/Text.vue';
import Checkbox from '@/components/inputs/Checkbox.vue';
import Radio from '@/components/inputs/Radio.vue';
import Select from '@/components/inputs/Select.vue';
import { useInputStore } from '@/stores/input.js';

const { get, put } = useInputStore();

const { type, name } = defineProps([
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

const isType = (t) => type === t;

const componentType = computed(() => {
  if (isType('text')) {
    return Text;
  } else if (isType('radio')) {
    return Radio;
  } else if (isType('checkbox')) {
    return Checkbox
  } else if (isType('select')) {
    return Select
  } else {
    return Text;
  }
});

provide('save', (name, value) => {
  if (name) {
    put(name, value)
  }
});

</script>

<template>
  <div class="fieldGroup_input">
    <label>
      <slot name="label">label</slot>
    </label>
    <component :is="componentType" v-bind="$props" :value="get(name)" />
  </div>
</template>

<style lang="css" scoped>
.fieldGroup_input {
  padding: 3px;
  line-height: 1.1em;
}

.input {
  padding: 5px;
}

label {
  display: block;
  font-size: .75em;
  margin-right: 5px;
}
</style>