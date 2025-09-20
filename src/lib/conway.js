import { copyState, color } from "@/lib/utils";

// global state of the canvas
const DEAD = color(100, 100, 100);
const LIVE = color(255, 0, 255);
const LIMBO = color(100, 150, 100);
const ANGEL = color(100, 255, 100);
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

export const conway = (ctx, state, rules) => {
  const nextGen = [];
  
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[0].length; j++) {
      if (!nextGen[i]) {
        nextGen[i] = [];
      }

      const live = countLive(state, i, j);
      nextGen[i][j] = rules(state[i][j], live);

      ctx.beginPath();
      ctx.fillStyle = getFillStyle(nextGen[i][j], live);
      ctx.arc(
        i * DIAMETER + 5, 
        j * DIAMETER + 5, 
        DIAMETER / 2, 
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  }

  copyState(state, nextGen);
}