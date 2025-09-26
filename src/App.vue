<script setup>
import { ref } from "vue";
import { conway } from "@/lib/automata";
import { drawAutomata, initState } from "@/lib/utils";
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

let state = [];

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
  playing.value = true;
  state = initState(
    canvas.HEIGHT.value,
    canvas.WIDTH.value,
    canvas.DIAMETER.value
  );
  generation.value = 0;
  draw(state);
}

const pause = () => {
  playing.value = false;
  clearInterval(interval.value);
}

const resume = () => {
  playing.value = true;
  draw(state);
}

const click = () => {
  state[canvas.grid.x][canvas.grid.y] = 1
}

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

      <Button v-if="!playing" @click="start">start</Button>
      <Button v-else @click="start">restart</Button>
      <Button v-if="!playing" @click="resume">resume</Button>
      <Button v-else @click="pause">pause</Button>
    </InputLayout>

    <canvas id="canvas" 
            height="600" 
            width="1000"
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
