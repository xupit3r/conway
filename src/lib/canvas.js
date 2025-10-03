import { reactive, ref, unref } from "vue";

export default function useCanvas (name) {
  const canvas = ref(null);
  const ctx = ref(null);
  const HEIGHT = ref(0);
  const WIDTH = ref(0);
  const DIAMETER = ref(10);
  const mouseX = ref(0);
  const mouseY = ref(0);
  const grid = reactive({
    x: 0,
    y: 0
  });
  const mousedown = ref(false);

  const onMousemove = (ev) => {
    // current x/y within the canvas
    mouseX.value = ev.clientX - canvas.value.offsetLeft;
    mouseY.value = ev.clientY - canvas.value.offsetTop;

    // current grid position
    grid.x = Math.floor(mouseX.value / DIAMETER.value);
    grid.y = Math.floor(mouseY.value / DIAMETER.value);
  }

  const onMousedown = (ev) => {
    mousedown.value = true;
  }

  const onMouseup = (ev) => {
    mousedown.value = false;
  }

  const clearCanvas = () => ctx.value.clearRect(
    0, 
    0, 
    canvas.value.width,
    canvas.value.height
  );

  const drawLayers = (layers, hover) => {
    clearCanvas();
    layers.forEach(({ state, color }) => {
      for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[0].length; j++) {
          if (state[i][j]) {
            drawPoint(i, j, color[state[i][j]]);
          }

          if (hover.x === i && hover.y === j) {
            drawPoint(i, j, "#fff");
          }
        }
      }
    });
  }

  const drawPoint = (x, y, fillStyle) => {
    const d = unref(DIAMETER);

    ctx.value.beginPath();
    ctx.value.fillStyle = fillStyle;
    ctx.value.arc(
      x * d + d / 2, 
      y * d + d / 2, 
      d / 2, 
      0,
      2 * Math.PI
    );
    ctx.value.fill();
  }

  window.addEventListener("load", () => {
    canvas.value = document.getElementById(name);
    ctx.value = canvas.value.getContext("2d");
    HEIGHT.value = canvas.value.height;
    WIDTH.value = canvas.value.width;
    canvas.value.addEventListener("mousemove", onMousemove);
    canvas.value.addEventListener("mousedown", onMousedown);
    canvas.value.addEventListener("mouseup", onMouseup);
  })

  return {
    ctx,
    canvas,
    HEIGHT,
    WIDTH,
    DIAMETER,
    mouseX,
    mouseY,
    grid,
    mousedown,
    clearCanvas,
    drawLayers
  }
}