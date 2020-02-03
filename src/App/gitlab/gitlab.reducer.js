import {
  setErrorsHandler,
  clearErrorsHandler,
  createReducer
} from "./../../utils/redux";
import { updateGitlabHandler } from "./gitlab.handlers";
import ACTIONS from "./gitlab.actions";
import initialState from "./gitlab.model";

const handlers = {
  [ACTIONS.UPDATE_GITLAB]: updateGitlabHandler,
  [ACTIONS.CLEAR_GITLAB_ERRORS]: clearErrorsHandler,
  [ACTIONS.SET_GITLAB_ERRORS]: setErrorsHandler
};

const gilabReducer = createReducer(initialState, handlers);

export default gilabReducer;
