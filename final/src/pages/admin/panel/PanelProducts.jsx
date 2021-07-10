import React from "react";
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

const PanelProducts = ({ products, btnTxt, ...props }) => {
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
      marginTop: theme.spacing(10),
      padding: theme.spacing(4),
      backgroundColor: theme.palette.secondary.light,
    },
    img: {
      height: 50,
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

  return (
    <Container className={classes.root}>
      <PanelHeader txt={"مدیریت کالا ها"} btnTxt={"افزودن کالای جدید"} />
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
                      <DeleteIcon color="error" />
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
