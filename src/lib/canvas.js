import { ref } from "vue";

export default function useCanvas (name) {
  const canvas = document.getElementById(name);
  const ctx = canvas.getContext("2d");
  const HEIGHT = canvas.height;
  const WIDTH = canvas.width;

  const mouseX = ref(0);
  const mouseY = ref(0);

  const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

  canvas.addEventListener("mouseover", ({ clientX, clientY }) => {
    mouseX.value = clientX;
    mouseY.value = clientY;
  });

  return {
    ctx,
    HEIGHT,
    WIDTH,
    clearCanvas,
    mouseX,
    mouseY
  }
}