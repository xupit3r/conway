import { copyState } from "@/lib/utils";

// moore neightborhood directions
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

export const conway = (state, rules) => {
  const nextGen = [];
  
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[0].length; j++) {
      if (!nextGen[i]) {
        nextGen[i] = [];
      }

      nextGen[i][j] = rules(
        state[i][j],
        countLive(state, i, j)
      );
    }
  }

  copyState(state, nextGen);
}