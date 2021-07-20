import {
  getADataById,
  getAllData,
  deleteADataById,
  addAData,
  editADataById,
} from "../../api/productApi";
import { ActionTypes } from "../actionTypes";

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

export const deletedProduct = (id) => {
  return {
    type: ActionTypes.DELETED_PRODUCT,
    payload: id,
  };
};

export const addedProduct = (product) => {
  return {
    type: ActionTypes.ADDED_PRODUCT,
    payload: product,
  };
};

export const editedProduct = (id) => {
  return {
    type: ActionTypes.EDITED_PRODUCT,
    payload: id,
  };
};

// Async Actions

export const getProducts = () => async (dispatch, getState) => {
  let res = await getAllData();
  dispatch(setProducts(res.data));
};

export const getAProduct = (id) => async (dispatch) => {
  let res = await getADataById(id);
  console.log(res);
  dispatch(selectedProduct(res.data));
};

export const deleteAProduct = (id) => async (dispatch) => {
  let res = await deleteADataById(id);
  dispatch(deletedProduct(res.data));
  window.location.reload();
};

export const addAProduct = (product) => async (dispatch, getState) => {
  let res = await addAData(product);
  console.log(res);
  dispatch(addedProduct(res.data));
};
export const editAProduct = (product) => async (dispatch, getState) => {
  let res = await editADataById(product);
  console.log(res);
  dispatch(editedProduct(res.data));
};
