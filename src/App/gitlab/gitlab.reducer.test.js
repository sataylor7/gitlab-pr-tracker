import initialState from "./gitlab.model";
import * as C from "./gitlab.creators";
import GitlabReducer from "./gitlab.reducer";

describe("gitlab reducer should", () => {
  let state;

  test("initialize to initial state", () => {
    state = GitlabReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  test("handle clearGitlabErrors()", () => {
    const action = C.clearGitlabErrors();
    const expectedResult = {
      ...state,
      errors: {}
    };
    state = GitlabReducer(state, action);

    expect(state).toEqual(expectedResult);
  });

  test("handle setGitlabErrors()", () => {
    const error = { message: "oopsy daisy" };
    const expectedResult = {
      ...state,
      errors: { ...error }
    };
    const action = C.setGitlabErrors(error);
    state = GitlabReducer(state, action);
    expect(state).toEqual(expectedResult);
  });

  // add the rest of the reducer tests
});
