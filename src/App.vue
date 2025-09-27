<script setup>
import { ref, watch } from "vue";
import { conway } from "@/lib/automata";
import { initState } from "@/lib/utils";
import { base, noOver } from "@/lib/rules";
import { useInputStore } from "@/stores/input.js";
import useCanvas from "@/lib/canvas.js";
import Input from "@/components/Input.vue";
import Counter from "@/components/Counter.vue";
import BaseLayout from "@/components/BaseLayout.vue";
import InputLayout from "@/components/InputLayout.vue";
import Button from "@/components/Button.vue";

const canvas = useCanvas("canvas");
const { stored, put } = useInputStore();

const generation = ref(0);
const interval = ref(null);
const playing = ref(false);

const automata = [{
  name: "Conway's Game of Life",
  value: 0,
  func: conway
}];

const rules = [{
  name: "Default Conway Rules",
  value: 0,
  func: base
}, {
  name: "No Overpopulation",
  value: 1,
  func: noOver
}];

put('automata', 0);
put('rule', 0);
put('timeBetween', 60);
put('height', 400);
put('width', 800);

let state = initState(
  stored.inputs.height,
  stored.inputs.width
);

let hoverState = {};

const start = () => {
  clearInterval(interval.value);
  playing.value = true;
  generation.value = 0;
  interval.value = setInterval(() => {
    generation.value++;
    automata[stored.inputs.automata].func(
      state,
      rules[stored.inputs.rule].func
    );
  }, stored.inputs.timeBetween)
}

const pause = () => {
  playing.value = false;
  clearInterval(interval.value);
}

const setPoint = () => {
  state[canvas.grid.x][canvas.grid.y] = 1
}

const clear = () => {
  canvas.clearCanvas();
  playing.value = false;
  generation.value = 0;
  clearInterval(interval.value);
  state = initState(
    stored.inputs.height,
    stored.inputs.width
  );
}

watch(canvas.grid, ({ x, y }) => {
  hoverState = {};
  hoverState[`${x}:${y}`] = 1;
});

window.addEventListener("load", () => {
  setInterval(() => {
    canvas.drawLayers([{
      state: state,
      color: "#ff00ff"
    }], hoverState);
  }, 100);
});

</script>

<template>
  <BaseLayout>
    <template v-slot:header>
      automata fun!
    </template>

    <InputLayout :horizontal="true">
      <Counter :count="generation">generation</Counter>
      <Input type="text" name="height">
        <template v-slot:label>height</template>
      </Input>
      <Input type="text" name="width">
        <template v-slot:label>width</template>
      </Input>
      <Input type="select" name="automata" :options="automata">
        <template v-slot:label>automata</template>
      </Input>
      <Input type="select" name="rule" :options="rules">
        <template v-slot:label>rule</template>
      </Input>

      <Button v-if="!playing" @click="start">start</Button>
      <Button v-else @click="pause">pause</Button>
      <Button @click="clear">clear</Button>
    </InputLayout>

    <canvas id="canvas" 
            :height="stored.inputs.height" 
            :width="stored.inputs.width"
            @click="setPoint"></canvas>
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
