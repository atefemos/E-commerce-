import { ActionTypes } from "../actionTypes";

const initialState = {
  orders: [],
};

export const OrderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ORDERS:
      return { ...state, orders: payload };
    default:
      return state;
  }
};
