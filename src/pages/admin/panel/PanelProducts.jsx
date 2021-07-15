import React, { useState, useEffect } from "react";
import AdminHeader from "../../../components/AdminHeader";
import Container from "@material-ui/core/Container";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { theme } from "../../../theme/customTheme";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PanelHeader from "../../../components/PanelHeader";
import { MenuItem, TextField } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteAProduct,
  addAProduct,
} from "../../../store/actions";
import Btn from "../../../components/Btn";
import FiledInput from "@material-ui/core/FilledInput";
import { handleUploadingImage } from "../../../utils/uploadImage";

const PanelProducts = ({ btnTxt, children, ...props }) => {
  const { productId } = useParams();
  const products = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      align: "left",
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
      backgroundColor: theme.palette.secondary.main,
    },
  }))(TableRow);

  const rows = products.products;

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
    root: {
      marginTop: theme.spacing(9),
      padding: theme.spacing(4),
      backgroundColor: theme.palette.secondary.light,
    },
    img: {
      height: 50,
    },
    input: {
      marginTop: theme.spacing(3),
    },
  });
  const classes = useStyles();

  const [state, setstate] = useState({});
  const [image, setImage] = useState("");
  const categories = ["لباس", "کیف", "کفش", "اکسسوری"];
  const subCats = ["زنانه", "مردانه"];

  const handleChange = (event) => {
    setstate({ ...state, [event.target.name]: event.target.value });
  };

  const handleTransformImageToBase64 = (e) => {
    const file = e.target.files[0];
    console.log(file.name);
    handleUploadingImage(file).then((res) => {
      console.log(res);
      setImage(res);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addAProduct({ ...state, id: rows.length + 1, price: "0", url: image })
    );
  };
  return (
    <Container className={classes.root}>
      <PanelHeader txt={"مدیریت کالا ها"} btnTxt={"افزودن کالای جدید"}>
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
      </PanelHeader>
      <AdminHeader />
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ردیف</StyledTableCell>
                <StyledTableCell>نام کالا</StyledTableCell>
                <StyledTableCell>دسته بندی</StyledTableCell>
                <StyledTableCell>تصویر</StyledTableCell>
                <StyledTableCell>حذف</StyledTableCell>
                <StyledTableCell>ویرایش</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.category}</StyledTableCell>
                  <StyledTableCell>
                    <img
                      src={row.url}
                      className={classes.img}
                      alt="this will load"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <DeleteIcon
                      color="error"
                      onClick={() => dispatch(deleteAProduct(row.id))}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <EditIcon color="primary" />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

export default PanelProducts;
