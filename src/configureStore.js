import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import throttle from "lodash/throttle";
import { name } from "../package.json";
import createRootReducer from "./reducers";
import { loadState, saveState } from "./utils/localStorage";

export const history = createBrowserHistory();

/**
 * Calls to storage that return undefined (such as
 * where it's diabled in incognito windows) break the app,
 * so make sure _something_ gets passed in as initialState
 */

const initialState = loadState() || {};
const store = window.__REDUX_DEVTOOLS_EXTENSION__
  ? createStore(
    createRootReducer(history),
    initialState,
    compose(
      applyMiddleware(routerMiddleware(history), thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__({
            name,
            instanceId: name
          })
    )
  )
  : createStore(
    createRootReducer(history),
    initialState,
    compose(applyMiddleware(routerMiddleware(history), thunk))
  );

/**
 * This subscribe function syndicates selected elements
 * from the Redux store to local/session storage. The purpose
 * of this is to instantaneously hydrate app state on events
 * that would otherwise clear it (such as refresh)
 *
 * WARNING: Please do not syndicate anything with strict
 * privacy concerns to storage this way.
 */
store.subscribe(
  throttle(() => {
    const { account, user } = store.getState();

    saveState({
      account,
      user
    });
  }, 1000)
);

export default store;
