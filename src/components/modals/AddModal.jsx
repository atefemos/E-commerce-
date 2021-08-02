import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import Btn from "../Btn";
import { makeStyles, MenuItem, TextField, Typography } from "@material-ui/core";
import { handleUploadingImage } from "../../utils/uploadImage";
import { theme } from "../../theme/customTheme";
import FiledInput from "@material-ui/core/FilledInput";
import { useDispatch, useSelector } from "react-redux";
import { addAProduct } from "../../store/actions/productsActions";
import { closeModal } from "../../store/actions/modalsAction";

//------set styles------
const useStyles = makeStyles({
  input: {
    marginTop: theme.spacing(1),
  },

  typo: {
    marginBottom: theme.spacing(3),
  },
});

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const categories = ["پوشاک", "کیف", "کفش", "اکسسوری"];
const subCats = ["زنانه", "مردانه"];

const AddModal = () => {
  const classes = useStyles();
  //------redux------
  const products = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();

  const rows = products.products;

  //------states------
  const [state, setState] = useState(null);
  const [image, setImage] = useState("");
  const [open, setOpen] = React.useState(false);

  //------upload image function------
  const handleTransformImageToBase64 = (e) => {
    const file = e.target.files[0];
    handleUploadingImage(file).then((res) => {
      setImage(res);
    });
  };

  //------handle functions------
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    console.log(state);
  };

  const handleSubmit = (e, id) => {
    // e.preventDefault();
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

  return (
    <div className={classes.root}>
      <Btn text={"افزودن کالا"} color="primary" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <form onSubmit={handleSubmit} className={classes.root}>
          <Typography variant="h3" className={classes.typo}>
            افزودن / ویرایش کالا
          </Typography>
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
          <Btn autoFocus color="primary" text={"ذخیره"} />
          <Btn onClick={handleClose} color="primary" text={"لغو"} />
        </form>
      </Dialog>
    </div>
  );
};

export default AddModal;
