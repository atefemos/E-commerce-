import { getAllOrders, getAnorderById, addOrder } from "../../api/orderApi";
import { ActionTypes } from "../actionTypes";
import { closeModal } from "./modalsAction";

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

export const addedOrder = (order) => {
  return {
    type: ActionTypes.ADDED_ORDER,
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

export const addAnOrder = (order) => async (dispatch, getState) => {
  let res = await addOrder(order);
  console.log(res);
  dispatch(addedOrder(res.data));
  dispatch(closeModal());
};
