import { getAllOrders } from "../../api/orderApi";
import { ActionTypes } from "../actionTypes";

export const setAllOrders = (orders) => {
  return {
    type: ActionTypes.SET_ORDERS,
    payload: orders,
  };
};

//Async Actions

export const getOrders = () => async (dispatch, getState) => {
  let res = await getAllOrders();
  dispatch(setAllOrders(res.data));
};
