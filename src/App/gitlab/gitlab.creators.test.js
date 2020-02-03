import mockStore from "../../utils/middlewareMockStore";
import ACTIONS from "./gitlab.actions";
import initialState from "./gitlab.model";
import * as C from "./gitlab.creators";

describe("Testing gitlab Creators", () => {
  const store = mockStore(initialState);
  afterEach(() => {
    store.clearActions();
  });

  test("setGitlabErrors() creates expected action", () => {
    const error = "oopsy daisy";
    const expectedResult = {
      type: ACTIONS.SET_GITLAB_ERRORS,
      payload: error
    };
    const action = C.setGitlabErrors(error);
    store.dispatch(action);
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedResult);
  });

  test("clearGitlabErrors() creates expected action", () => {
    const expectedResult = {
      type: ACTIONS.CLEAR_GITLAB_ERRORS
    };
    const action = C.clearGitlabErrors();
    store.dispatch(action);
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedResult);
  });

  // please fill out the rest of the tests for the creators
});
