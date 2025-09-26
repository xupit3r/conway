import { copyState, color } from "@/lib/utils";

// global state of the canvas
const DEAD = color(100, 100, 100);
const LIVE = color(50, 255,50);
const LIMBO = color(50, 200, 50);
const ANGEL = color(50, 100, 50);
const DIAMETER = 10;
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

const getFillStyle = (me, live) => {
  if (me && live <= 3) {
    return LIVE;
  } else if (live > 3 && live <= 5) {
    return LIMBO;
  } else if (live > 5) {
    return ANGEL;
  }  else {
    return DEAD;
  }
}

const countLive = (state, i, j) => {
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

  return live;
}

export const conway = (draw, generation, state, rules) => {
  const nextGen = [];
  
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[0].length; j++) {
      if (!nextGen[i]) {
        nextGen[i] = [];
      }

      const live = countLive(state, i, j);
      nextGen[i][j] = rules(state[i][j], live);

      draw(i, j, getFillStyle(nextGen[i][j], live))
    }
  }

  copyState(state, nextGen);
}