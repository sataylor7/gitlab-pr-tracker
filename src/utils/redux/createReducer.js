// https://redux.js.org/recipes/reducing-boilerplate#generating-reducers
export default function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action = {}) {
    // https://eslint.org/docs/rules/no-prototype-builtins
    const canHandleType = Object.prototype.hasOwnProperty.call(
      handlers,
      action.type
    );

    if (canHandleType) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}
