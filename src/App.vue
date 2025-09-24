<script setup>
import { ref } from "vue";
import { conway } from "@/lib/conway.js";
import { drawAutomata } from "@/lib/utils";
import { base, noOver } from "@/lib/rules";
import useCanvas from "@/lib/canvas.js";
import { useInputStore } from "@/stores/input.js";
import Input from "@/components/Input.vue";
import Counter from "@/components/Counter.vue";
import BaseLayout from "@/components/BaseLayout.vue";
import InputLayout from "./components/InputLayout.vue";

const { stored, put } = useInputStore();

const timeBetween = ref(100);
const generation = ref(0);
const interval = ref(null);

const rules = [{
  name: "Default Conway Rules",
  value: 0,
  func: base
}, {
  name: "No Overpopulation",
  value: 1,
  func: noOver
}];

put('rule', 0);

const drawer = drawAutomata(
  conway
);

const startOver = (ev) => {
  const canvas = useCanvas("canvas");
  clearInterval(interval.value);
  interval.value = drawer(
    generation,
    timeBetween,
    canvas,
    rules[stored.inputs.rule].func
  )
}

window.addEventListener("load", () => {
  const canvas = useCanvas("canvas");
  interval.value = drawer(
    generation,
    timeBetween,
    canvas,
    rules[stored.inputs.rule].func
  );
});
</script>

<template>
  <BaseLayout>
    <template v-slot:header>
      automata fun!
    </template>

    <InputLayout :horizontal="true">
      <Counter :count="generation">generation</Counter>
      <Input @change="startOver" type="select" name="rule" :options="rules">
        <template v-slot:label>rule</template>
      </Input>
    </InputLayout>

    <canvas id="canvas" height="600" width="1000"></canvas>
  </BaseLayout>
</template>

<style scoped>
#canvas {
  background-color: rgb(100, 100, 100);
  position: relative !important;
  border: lightgrey 1px solid;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
}
</style>
