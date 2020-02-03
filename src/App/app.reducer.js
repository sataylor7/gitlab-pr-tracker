import { combineReducers } from "redux";
import gitlab from "./gitlab/gitlab.reducer";

/**
 * All of the example feature (login, signup, myaccount) reducers should be added here
 * this way when these are imported into the main app, they will be namespaced under User_App in the redux store
 */
const appReducer = combineReducers({
  gitlab
});

export default appReducer;
