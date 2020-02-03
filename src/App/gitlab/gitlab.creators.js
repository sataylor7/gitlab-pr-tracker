import { push } from "connected-react-router";
import { makeActionCreator } from "./../../utils/redux";
import ACTIONS from "./gitlab.actions";
import api from "../../resource/api.resource";

/**
 * @description Clears Gitlab completely
 */
export const clearGitlabErrors = () =>
  makeActionCreator(ACTIONS.CLEAR_GITLAB_ERRORS);

/**
 * @description Set an error/errors of the Gitlab
 */
export const setGitlabErrors = errors =>
  makeActionCreator(ACTIONS.SET_GITLAB_ERRORS, errors);

/**
 * @description Update fields on the Gitlab
 * @param {*} payload
 */
export const updateGitlab = payload =>
  makeActionCreator(ACTIONS.UPDATE_GITLAB, payload);

/**
 * @description call the example resource to retreive the example response
 *
 */
export const exampleMethod = values => async (dispatch, getState) => {
  dispatch(clearGitlabErrors());

  let user;
  try {
    user = await api.fetch(values);
  } catch (e) {
    // determine what to do with errors
    dispatch(setGitlabErrors(e.errors));
    return;
  }

  // update user in the redux store

  // update this to where it should go
  dispatch(push("/"));
};
