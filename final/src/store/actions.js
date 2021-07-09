import { getADataById, getAllData } from "../api/productApi";
import { ActionTypes } from "./actionTypes";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const getProducts = () => async (dispatch, getState) => {
  let res = await getAllData();
  dispatch(setProducts(res.data));
};

// export const getAProduct = (id) => async (dispatch) => {
//   let res = await getADataById(id);
//   console.log(res.data);
//   dispatch(selectedProduct(res.data));
// };
