import { color, bound } from "@/lib/utils.js";

export const wheat = (ctx, generation, state, rules) => {
  console.log(`generation ${generation}`);
  for (let i = 0; i < 10; i++) {
    ctx.moveTo(0, 0);
    ctx.beginPath();
    ctx.strokeStyle = color(255, 255, i * 25);
    ctx.bezierCurveTo(
      bound(generation, i * 5, 50),
      bound(generation, i * 10, 100),
      bound(generation, 0, 200),
      bound(generation, 0, 300),
      400,
      400
    );
    ctx.stroke();
  }
}