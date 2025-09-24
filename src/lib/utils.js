export const bound =  (step, lower, upper) => {
  const distance = upper - lower;

  return (Math.floor(step / distance) % 2
    ? upper - step % distance
    : lower + step % distance
  );
}

export const initState = (height, width) => {
  let state = [];

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (!state[i]) {
        state[i] = [];
      }

      state[i][j] = Math.random() > .5 ? 1 : 0;
    }
  }

  return state;
}

export const copyState = (state, newState) => {
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[0].length; j++) {
      state[i][j] = newState[i][j];
    }
  }
}

export const color = (n1, n2, n3) => {
  return `rgb(
    ${Math.floor(n1)} 
    ${Math.floor(n2)} 
    ${Math.floor(n3)}
  )`;
}

export const drawAutomata = (automata) => {
  return (generation, timeBetween, canvas, rules) => {
    const state = initState(
      canvas.HEIGHT,
      canvas.WIDTH
    );

    const interval = setInterval(() => {
      generation.value++;
      canvas.clearCanvas();
      const allDone = automata(canvas.ctx, state, rules);

      if (allDone) {
        clearInterval(interval);
      }
    }, timeBetween);

    return interval;
  }
}