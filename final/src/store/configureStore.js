import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import reducer from "./reducers";

export default function configureStore() {
  const store = createStore(reducer, devToolsEnhancer);
  return store;
}
