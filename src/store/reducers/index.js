import { combineReducers } from "redux";
import { productReducer } from "./productsReducers";
import { modalReducer } from "./modalReducer";
import { OrderReducer } from "./orderReducer";

export const reducers = combineReducers({
  allProducts: productReducer,
  modal: modalReducer,
  allOrders: OrderReducer,
});
