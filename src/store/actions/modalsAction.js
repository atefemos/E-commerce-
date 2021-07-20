import { ActionTypes } from "../actionTypes";

export const openModal = () => {
  return {
    type: ActionTypes.OPEN_MODAL,
  };
};

export const closeModal = () => {
  return {
    type: ActionTypes.CLOSE_MODAL,
  };
};
