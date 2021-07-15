import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducers } from "./index";

const middlewareEnhancer = applyMiddleware(
  // logger,
  ReduxThunk
);
const composedEnhancers = composeWithDevTools(middlewareEnhancer);

const store = createStore(reducers, undefined, composedEnhancers);

export default store;
