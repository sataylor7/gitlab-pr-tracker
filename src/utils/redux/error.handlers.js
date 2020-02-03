import { returnNewErrors } from "./reducer.utils";
/**
 * @description A generic error handler to update the store with errors
 * @param {Object} state - the existing state
 * @param {string} action.type - the action type
 * @param {Object} action.payload - the data to load
 */
export const setErrorsHandler = function(state, action) {
  return {
    ...state,
    errors: returnNewErrors(state.errors, action.payload)
  };
};
/**
 * @description A generic error handler to clear the store of errors
 * @param {Object} state - the existing state
 */
export const clearErrorsHandler = function(state) {
  return {
    ...state,
    errors: {}
  };
};

export default setErrorsHandler;
