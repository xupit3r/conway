import { defineStore } from "pinia"
import { reactive, computed } from "vue";

export const useInputStore = defineStore('input', () => {
  const stored = reactive({
    inputs: {}
  });

  function put (name, value) {
    stored.inputs[name] = value; 
  }

  const get = computed(() => (name) => {
    return stored.inputs[name];
  });

  return { stored, get, put }
});