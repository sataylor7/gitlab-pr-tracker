/**
 * sort a list of objects based on a key - we do the slice to create a new array so that react will
 * trigger the re-render
 */
export const objectSort = (list, key) => {
  return list.slice().sort((a, b) => (a[key] > b[key] ? 1 : -1));
};
