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

const PanelProducts = () => {
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
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
    },
  }))(TableRow);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData(1, 159, 6.0, 24, 4.0),
    createData(2, 237, 9.0, 37, 4.3),
    createData(3, 262, 16.0, 24, 6.0),
    createData(4, 305, 3.7, 67, 4.3),
    createData(5, 356, 16.0, 49, 3.9),
  ];

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
    root: {
      marginTop: theme.spacing(15),
    },
  });
  const classes = useStyles();

  return (
    <Container className="root">
      <AdminHeader />
      <div className={classes.root}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">ردیف</StyledTableCell>
                <StyledTableCell align="left">نام کالا</StyledTableCell>
                <StyledTableCell align="left">دسته بندی</StyledTableCell>
                <StyledTableCell align="left">تصویر</StyledTableCell>
                <StyledTableCell align="left">حذف/ویرایش</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.calories}</StyledTableCell>
                  <StyledTableCell align="left">{row.fat}</StyledTableCell>
                  <StyledTableCell align="left">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="left">{row.protein}</StyledTableCell>
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
