/**
 * EXAMPLE: simple handler for the Gitlab
 */
export const updateGitlabHandler = (state, action) => ({
  ...state,
  ...action.payload
});
