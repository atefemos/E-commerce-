import { combineReducers } from "redux";
import { productReducer } from "./productsReducers";
import { modalReducer } from "./modalReducer";
import { orderReducer } from "./orderReducer";

export const reducers = combineReducers({
  allProducts: productReducer,
  modal: modalReducer,
  allOrders: orderReducer,
});
