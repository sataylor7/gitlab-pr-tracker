import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockedStore = configureMockStore(middlewares);
export default mockedStore;
