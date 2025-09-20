<script setup>
import { ref } from "vue"; 
import { conway } from "@/lib/conway.js";
import { initState } from "@/lib/utils";
import { base } from "@/lib/rules";
import useCanvas from "@/lib/canvas.js";

const TIME_BETWEEN_DRAWS = 100;
const generation = ref(0);

const drawAutomata = (automata) => {
  return () => {
    const { 
      clearCanvas,
      ctx,
      HEIGHT,
      WIDTH } = useCanvas("canvas");
    const state = initState(HEIGHT, WIDTH);

    const interval = setInterval(() => {
      generation.value++;
      clearCanvas();
      automata(ctx, state, base);
    }, TIME_BETWEEN_DRAWS);

    return interval;
  }
}

window.addEventListener("load", drawAutomata(conway));
</script>

<template>
  <div>generation <strong>{{ generation }}</strong></div>
  <canvas id="canvas" height="600" width="800"></canvas>
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
