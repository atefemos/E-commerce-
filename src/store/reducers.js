import { ActionTypes } from "./actionTypes";

const initialState = {
  products: [],
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, selectedProduct: payload };
    case ActionTypes.DELETED_PRODUCT:
      return {
        ...state,
        products: state.products.filter((item) => item.id !== payload),
      };
    case ActionTypes.ADDED_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload],
      };

    default:
      return state;
  }
};
