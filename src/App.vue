<script setup>
import { ref } from "vue"; 
import { conway } from "@/lib/conway.js";
import { initState } from "@/lib/utils";
import useCanvas from "@/lib/canvas.js";

const TIME_BETWEEN_DRAWS = 300;
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
      generation.value = generation.value + 1;
      clearCanvas();
      automata(ctx, state);
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

<style scoped></style>
