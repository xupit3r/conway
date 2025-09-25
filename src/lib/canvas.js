import { ref } from "vue";

export default function useCanvas (name) {
  const canvas = document.getElementById(name);
  const ctx = canvas.getContext("2d");
  const HEIGHT = canvas.height;
  const WIDTH = canvas.width;

  const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

  return {
    ctx,
    canvas,
    HEIGHT,
    WIDTH,
    clearCanvas
  }
}