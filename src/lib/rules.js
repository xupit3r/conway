/**
 * this is the typical set of rule for Conway Game of Life
 * 
 * @param {Number} me the current cell value
 * @param {Number} live the number of live cell neightbors 
 * (assuming a moore neighborhood config)
 * @returns next generation value for the current cell
 */
export const base = (me, live) => {
  if (me === 1 && (live < 2 || live > 3)) {
    return 0;
  } else if (me === 1 && (live === 2 || live === 3)) {
    return 1;
  } else if (me === 0 && live === 3) {
    return 1;
  } else {
    return me;
  }
}

/**
 * less of an emphasis on overpopulation... this keeps
 * things going indefinitely... or so it appears...
 * 
 * @param {Number} me the current cell value
 * @param {Number} live the number of live cell neightbors 
 * (assuming a moore neighborhood config)
 * @returns next generation value for the current cell
 */
export const noOver = (me, live) => {
  if (me === 1 && live < 2) {
    return 0;
  } else if (me === 1 && live === 2) {
    return 1;
  } else if (me === 0 && live === 3) {
    return 1;
  } else if (me === 0 && live > 6) {
    return 1;
  } else if (me === 1 && live > 3 && live < 6) {
    return 0;
  } else {
    return me;
  }
}