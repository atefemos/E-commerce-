/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAProduct,
  editAProduct,
  getAProduct,
  selectedProduct,
} from "../../store/actions/productsActions";

import { openModal } from "../../store/actions/modalsAction";
import { Sync } from "@material-ui/icons";
import { getADataById } from "../../api/productApi";

const AddEditModal = ({ editable, update, selected, ...props }) => {
  return <div>com</div>;
};

export default AddEditModal;
