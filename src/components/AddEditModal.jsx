import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAProduct, addedProduct } from "../store/actions";
import { MenuItem, TextField } from "@material-ui/core";
import { handleUploadingImage } from "../utils/uploadImage";
import FiledInput from "@material-ui/core/FilledInput";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../theme/customTheme";

import BasicModal from "./BasicModal";
import Btn from "./Btn";

const AddEditModal = ({ onOpen, ...props }) => {
  const products = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();

  const [state, setstate] = useState({});
  const [image, setImage] = useState("");
  const categories = ["لباس", "کیف", "کفش", "اکسسوری"];
  const subCats = ["زنانه", "مردانه"];

  const rows = products.products;

  const useStyles = makeStyles({
    input: {
      marginTop: theme.spacing(3),
    },
  });

  const classes = useStyles();

  const handleChange = (event) => {
    setstate({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addAProduct({
        ...state,
        id: rows.length + 1,
        price: "0",
        url: image,
        supply: "0",
      })
    );
  };

  const handleTransformImageToBase64 = (e) => {
    const file = e.target.files[0];
    console.log(file.name);
    handleUploadingImage(file).then((res) => {
      console.log(res);
      setImage(res);
    });
  };

  return (
    <BasicModal btnTxt={"افزودن کالا"}>
      <form onSubmit={handleSubmit}>
        <p>افزودن / ویرایش کالا</p>
        <TextField
          id="outlined-basic"
          label="نام کالا"
          variant="outlined"
          fullWidth
          required
          focused
          name="name"
          className={classes.input}
          onChange={handleChange}
        />
        <TextField
          id="outlined-select-category"
          select
          fullWidth
          name="category"
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
