import { copyState, color } from "@/lib/utils";

// global state of the canvas
const DEAD = color(255, 255, 255);
const LIVE = color(100, 100, 100);
const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [-1, -1],
  [1, -1], 
  [-1, 1]
];

const findNextGen = (rules, state, i, j) => {
  let live = 0;
  const m = state.length;
  const n = state[0].length;

  for (let [dx, dy] of DIRECTIONS) {
    let x = i + dx;
    let y = j + dy;

    if (x >= 0 && x < m && y >= 0 && y < n
      && (state[x][y] === 1)) {
      live++;
    }
  }

  return rules(state[i][j], live);
}

export const conway = (ctx, state, rules) => {
  const nextGen = [];
  
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[0].length; j++) {
      if (!nextGen[i]) {
        nextGen[i] = [];
      }

      nextGen[i][j] = findNextGen(rules, state, i, j);

      ctx.beginPath();
      ctx.fillStyle = nextGen[i][j] ? LIVE : DEAD;
      ctx.arc(i * 10 + 5, j * 10 + 5, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  copyState(state, nextGen);
}