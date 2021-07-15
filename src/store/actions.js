import { getADataById, getAllData, deleteADataById } from "../api/productApi";
import { ActionTypes } from "./actionTypes";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};

export const deletedProduct = (product) => {
  return {
    type: ActionTypes.DELETED_PRODUCT,
    payload: product,
  };
};

export const getProducts = () => async (dispatch, getState) => {
  let res = await getAllData();
  dispatch(setProducts(res.data));
};

export const getAProduct = (id) => async (dispatch) => {
  let res = await getADataById(id);
  dispatch(selectedProduct(res.data));
};

export const deleteAProduct = (id) => async (dispatch) => {
  let res = await deleteADataById(id);
  dispatch(deletedProduct(res.data));
  window.location.reload();
};
