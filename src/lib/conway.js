import { copyState, color } from "@/lib/utils";

// global state of the canvas
const DEAD = color(255, 255, 255);
const LIVE = color(100, 100, 100);
const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [-1, -1],
  [1, -1], 
  [-1, 1]
];

export const conway = (ctx, state) => {
  const newState = [];
  const m = state.length;
  const n = state[0].length;
  
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[0].length; j++) {
      let live = 0;

      if (!newState[i]) {
        newState[i] = [];
      }

      for (let [dx, dy] of directions) {
        let x = i + dx;
        let y = j + dy;

        if (x >= 0 && x < m && y >= 0 && y < n
          && (state[x][y] === 1)) {
          live++;
        }
      }

      if (state[i][j] === 1 && (live < 2 || live > 3)) {
        newState[i][j] = 0;
      } else if (state[i][j] === 1 && (live === 2 || live === 3)) {
        newState[i][j] = 1;
      } else if (state[i][j] === 0 && live === 3) {
        newState[i][j] = 1;
      } else {
        newState[i][j] = state[i][j];
      }

      ctx.beginPath();
      ctx.fillStyle = newState[i][j] ? LIVE : DEAD;
      ctx.arc(i * 10 + 5, j * 10 + 5, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  copyState(state, newState);
}