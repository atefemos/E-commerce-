import { ActionTypes } from "../actionTypes";

const initialState = {
  orders: [],
  order: {},
};

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ORDERS:
      return { ...state, orders: payload };
    case ActionTypes.SELECTED_ORDER:
      return { ...state, order: payload };
    default:
      return state;
  }
};
