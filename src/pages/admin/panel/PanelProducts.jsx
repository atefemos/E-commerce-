import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "@material-ui/core/TablePagination";
import {
  getProducts,
  deleteAProduct,
  getAProduct,
} from "../../../store/actions/productsActions";
import AddModal from "../../../components/modals/AddModal";

//------styles------
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
    height: 30,
  },
});

//------styled cell------
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

const PanelProducts = ({ btnTxt, children, ...props }) => {
  const classes = useStyles();

  //------redux------
  const products = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const rows = products.products;

  //------Pagination------

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container className={classes.root}>
      <PanelHeader txt={"مدیریت کالاها"}>
        <AddModal />
      </PanelHeader>
      <AdminHeader />
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label=" customized table">
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
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.id}>
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
                    <EditIcon
                      color="primary"
                      onClick={() => {
                        setEditable(!editable);
                        dispatch(getAProduct(row.id));
                      }}
                    />
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
          component="div"
          count={rows.length}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </Container>
  );
};

export default PanelProducts;
