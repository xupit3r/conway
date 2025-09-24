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

export const noOver = (me, live) => {
  if (me === 1 && live < 2) {
    return 0;
  } else if (me === 1) {
    return 1;
  } else if (me === 0 && live === 3) {
    return 1;
  } else {
    return me;
  }
}