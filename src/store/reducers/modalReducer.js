import { ActionTypes } from "../actionTypes";

const initialState = {
  open: false,
};
export const modalReducer = (state = initialState, { type }) => {
  switch (type) {
    case ActionTypes.OPEN_MODAL:
      return { open: true };
    case ActionTypes.CLOSE_MODAL:
      return { open: false };
    default:
      return { state };
  }
};
