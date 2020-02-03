/**
 * @description A generic clear state handler to clear the store of the data
 * @param {Object} initialState - the initial state
 */
export const clearStateHandler = function(initialState) {
  return { ...initialState };
};
/**
 * @description A generic update state handler to update the store with new state data
 * @param {Object} state - the existing state
 * @param {string} action.type - the action type
 * @param {Object} action.payload - the data to load
 */
export const updateStateHandler = function(state, action) {
  return {
    ...state,
    ...(action.payload || {})
  };
};
