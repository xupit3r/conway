<script setup>
import { ref } from "vue";
import { conway } from "@/lib/conway.js";
import { wheat } from "@/lib/automata";
import { drawAutomata, initState } from "@/lib/utils";
import { base, noOver } from "@/lib/rules";
import useCanvas from "@/lib/canvas.js";
import { useInputStore } from "@/stores/input.js";
import Input from "@/components/Input.vue";
import Counter from "@/components/Counter.vue";
import BaseLayout from "@/components/BaseLayout.vue";
import InputLayout from "@/components/InputLayout.vue";
import Button from "@/components/Button.vue";

const { stored, put } = useInputStore();

const generation = ref(0);
const interval = ref(null);
const paused = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);

let startState = [];
let state = [];
let canvas = null;

const automata = [{
  name: "Conway's Game of Life",
  value: 0,
  func: conway
}, {
  name: "Wheat",
  value: 1,
  func: wheat
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
put('timeBetween', 100);

const draw = (state) => {
  interval.value = drawAutomata(
    automata[stored.inputs.automata].func,
    state,
    generation,
    stored.inputs.timeBetween,
    canvas,
    rules[stored.inputs.rule].func
  );
}

const start = () => {
  clearInterval(interval.value);
  canvas = useCanvas("canvas");
  state = initState(canvas.HEIGHT, canvas.WIDTH);
  generation.value = 0;
  draw(state);
}

const pause = () => {
  paused.value = true;
  clearInterval(interval.value);
}

const resume = () => {
  paused.value = false;
  draw(state);
}

const mousemove = (ev) => {
  const { ctx, canvas, clearCanvas } = useCanvas("canvas");

  clearCanvas();
  
  mouseX.value = ev.clientX - canvas.offsetLeft;
  mouseY.value = ev.clientY - canvas.offsetTop;

  ctx.beginPath();
  ctx.fillStyle = "#ff00ff";
  ctx.arc(
    mouseX.value, 
    mouseY.value, 
    5, 
    0,
    2 * Math.PI
  );
  ctx.fill();

  for (let i = 0; i < startState.length; i++) {
    for (let j = 0; j < startState[0].length; j++) {
      if (startState[i] && startState[i][j]) {
        ctx.beginPath();
        ctx.fillStyle = "#ff00ff";
        ctx.arc(
          i, 
          j, 
          5, 
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    }
  }
}

const click = (ev) => {
  const { canvas } = useCanvas("canvas");

  let x = ev.clientX - canvas.offsetLeft;
  let y = ev.clientY - canvas.offsetTop;

  if (!startState[x]) {
    startState[x] = [];
  }

  startState[x][y] = 1;
}

window.addEventListener("load", () => {
  const { HEIGHT, WIDTH } = useCanvas("canvas");

  startState = [];
  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {
      if (!startState[i]) {
        startState[i] = [];
      }

      startState[i][j] = 0;
    }
  }

})

</script>

<template>
  <BaseLayout>
    <template v-slot:header>
      automata fun!
    </template>

    <InputLayout :horizontal="true">
      <Counter :count="generation">generation</Counter>
      <Input type="text" name="timeBetween">
        <template v-slot:label>interval</template>
      </Input>
      <Input type="select" name="automata" :options="automata">
        <template v-slot:label>automata</template>
      </Input>
      <Input type="select" name="rule" :options="rules">
        <template v-slot:label>rule</template>
      </Input>

      <Button @click="start">start</Button>
      <Button v-if="paused" @click="resume">resume</Button>
      <Button v-else @click="pause">pause</Button>
    </InputLayout>

    <canvas id="canvas" 
            height="600" 
            width="1000" 
            @mousemove="mousemove"
            @click="click"></canvas>
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
