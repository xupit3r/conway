import { reactive, ref, unref } from "vue";

export default function useCanvas (name) {
  const canvas = ref(null);
  const ctx = ref(null);
  const HEIGHT = ref(0);
  const WIDTH = ref(0);
  const DIAMETER = ref(4);
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

  // track the mouse button being up/down
  const onMousedown = (ev) => mousedown.value = true;
  const onMouseup = (ev) => mousedown.value = false;

  const clearCanvas = () => ctx.value.clearRect(
    0, 
    0, 
    canvas.value.width,
    canvas.value.height
  );

  /**
   * draws layers onto the canvas
   * 
   * @param {Array} layers an array of layers made up of 
   * objects of the form:
   *  {
   *    state: [][],
   *    color: {
   *      <number>: <CSS color>
   *    }
   *  } 
   * @param {Object} hover an object of the form:
   *   {
   *     x: <number>,
   *     y: <number>
   *   } 
   * 
   *  that indicates the hover position of the mouse
   */
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

  /**
   * draws a point on the canvas
   * 
   * @param {Number} x x coordinate of the point 
   * @param {*} y y coordinate of the point
   * @param {*} fillStyle the fillstyle for the point
   */
  const drawPoint = (x, y, fillStyle) => {
    const d = unref(DIAMETER);

    ctx.value.beginPath();
    ctx.value.fillStyle = fillStyle;
    ctx.value.arc(
      x * d + Math.floor(d / 2), 
      y * d + Math.floor(d / 2), 
      Math.floor(d / 2), 
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

    // tracking for mouse events
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