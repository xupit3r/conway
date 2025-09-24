<script setup>
import { ref } from "vue"; 
import { conway } from "@/lib/conway.js";
import { drawAutomata } from "@/lib/utils";
import { base } from "@/lib/rules";
import useCanvas from "@/lib/canvas.js";
import Counter from "@/components/Counter.vue";

const timeBetween = ref(100);
const generation = ref(0);
const interval = ref(null);
const drawer = drawAutomata(
  conway
);


window.addEventListener("load", () => {
  const canvas = useCanvas("canvas");
  interval.value = drawer(
    generation,
    timeBetween,
    canvas,
    base
  );
});
</script>

<template>
  <Counter :count="generation">generation</Counter>
  <canvas id="canvas" height="600" width="1000"></canvas>
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
