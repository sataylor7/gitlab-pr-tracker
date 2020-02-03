import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import gitlabApp from "./App/app.reducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    gitlabApp
  });
