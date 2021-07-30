import { getAllOrders, getAnorderById } from "../../api/orderApi";
import { ActionTypes } from "../actionTypes";

export const setAllOrders = (orders) => {
  return {
    type: ActionTypes.SET_ORDERS,
    payload: orders,
  };
};

export const setAnOrders = (order) => {
  return {
    type: ActionTypes.SELECTED_ORDER,
    payload: order,
  };
};

//Async Actions

export const getOrders = () => async (dispatch, getState) => {
  let res = await getAllOrders();
  dispatch(setAllOrders(res.data));
};

export const getAnOrder = (id) => async (dispatch, getState) => {
  let res = await getAnorderById(id);
  dispatch(setAnOrders(res.data));
};
