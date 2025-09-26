import { ref, unref } from "vue";

export default function useCanvas (name) {
  const canvas = ref(null);
  const ctx = ref(null);
  const HEIGHT = ref(0);
  const WIDTH = ref(0);
  const DIAMETER = ref(10);
  const mouseX = ref(0);
  const mouseY = ref(0); 

  const mousemove = (ev) => {    
    mouseX.value = ev.clientX - canvas.value.offsetLeft;
    mouseY.value = ev.clientY - canvas.value.offsetTop;
  }

  const clearCanvas = () => ctx.value.clearRect(
    0, 
    0, 
    canvas.value.width,
    canvas.value.height
  );

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

    canvas.value.addEventListener("mousemove", mousemove);
  })

  return {
    ctx,
    canvas,
    HEIGHT,
    WIDTH,
    DIAMETER,
    clearCanvas,
    drawPoint
  }
}