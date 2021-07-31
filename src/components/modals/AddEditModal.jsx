/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAProduct,
  editAProduct,
  getAProduct,
  selectedProduct,
} from "../../store/actions/productsActions";
import { MenuItem, TextField, Typography } from "@material-ui/core";
import { handleUploadingImage } from "../../utils/uploadImage";
import FiledInput from "@material-ui/core/FilledInput";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../theme/customTheme";
import BasicModal from "./BasicModal";
import Btn from "../Btn";
import { openModal } from "../../store/actions/modalsAction";
import { Sync } from "@material-ui/icons";
import { getADataById } from "../../api/productApi";

//------styles------
const useStyles = makeStyles({
  input: {
    marginTop: theme.spacing(1),
  },
});

const AddEditModal = ({ editable, update, selected, ...props }) => {
  const classes = useStyles();

  //------redux------
  const products = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();

  //------states------
  const [state, setState] = useState(null);
  const [image, setImage] = useState("");

  const categories = ["پوشاک", "کیف", "کفش", "اکسسوری"];
  const subCats = ["زنانه", "مردانه"];

  const rows = products.products;

  useEffect(() => {
    setState(editable && selected);
  });

  console.log(selected);
  console.log(editable);

  //------handle functions------
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    console.log(state);
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    {
      editable
        ? dispatch(
            editAProduct(state.id, {
              ...state,
              id: id,
              price: "0",
              url: image,
              supply: "0",
            })
          )
        : dispatch(
            addAProduct({
              ...state,
              id: rows.length + 1,
              price: "0",
              url: image,
              supply: "0",
            })
          );
    }
    update();
  };

  // dispatch(getAProduct(e.id));
  editable && dispatch(openModal());

  //------upload image function------
  const handleTransformImageToBase64 = (e) => {
    const file = e.target.files[0];
    handleUploadingImage(file).then((res) => {
      setImage(res);
    });
  };

  return (
    <BasicModal btnTxt={"افزودن کالا"} update={update}>
      <form onSubmit={handleSubmit}>
        <Typography variant="body1">افزودن / ویرایش کالا</Typography>
        <TextField
          id="outlined-basic"
          label="نام کالا"
          variant="outlined"
          fullWidth
          required
          focused
          name="name"
          defaultValue={state?.name}
          className={classes.input}
          onChange={handleChange}
        />
        <TextField
          id="outlined-select-category"
          select
          fullWidth
          name="category"
          defaultValue={state?.category}
          label="نوع کالا"
          onChange={handleChange}
          variant="outlined"
          className={classes.input}
        >
          {categories.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-subCat"
          select
          fullWidth
          name="subCat"
          defaultValue={state?.subCat}
          label="مورد استفاده"
          onChange={handleChange}
          variant="outlined"
          className={classes.input}
        >
          {subCats.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <FiledInput
          type="file"
          fullWidth
          variant="outlined"
          color={"primary"}
          placeholder="slkd"
          className={classes.input}
          onChange={handleTransformImageToBase64}
        />
        <TextField
          variant="outlined"
          multiline
          fullWidth
          name="detail"
          defaultValue={state?.detail}
          onChange={handleChange}
          className={classes.input}
          placeholder="توضیحات"
        />

        <Btn text={"ذخیره"} color={"primary"} />
      </form>
    </BasicModal>
  );
};

export default AddEditModal;
