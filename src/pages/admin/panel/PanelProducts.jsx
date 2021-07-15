import React, { useState } from "react";
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
import { getAllData } from "../../../api/productApi";
import WithLoading from "../../../HOC/WithLoading";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TablePagination from "@material-ui/core/TablePagination";
import PanelHeader from "../../../components/PanelHeader";
import { MenuItem, TextField } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const PanelProducts = ({ products, btnTxt, children, ...props }) => {
  const { productId } = useParams();
  const dispatch = useDispatch;

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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    console.log(e);
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const [Category, setCategory] = useState([]);
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const categories = ["لباس", "کیف", "کفش", "اکسسوری"];

  return (
    <Container className={classes.root}>
      <PanelHeader txt={"مدیریت کالا ها"} btnTxt={"افزودن کالای جدید"}>
        <p>افزودن / ویرایش کالا</p>
        <TextField
          id="outlined-basic"
          label="نام کالا"
          variant="outlined"
          fullWidth
          required
          focused
          className={classes.input}
        />
        <TextField
          id="outlined-select-currency"
          select
          fullWidth
          label="نوع کالا"
          value={Category}
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.category}</StyledTableCell>
                    <StyledTableCell>
                      <img src={row.url} className={classes.img} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <DeleteIcon
                        color="error"
                        onClick={() => console.log("delet")}
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Container>
  );
};

export default WithLoading(PanelProducts, getAllData);
