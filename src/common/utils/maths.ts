export const getUID = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);
