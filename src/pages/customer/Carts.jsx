import {
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MainHeader from "../../components/MainHeader";
import { makeStyles } from "@material-ui/core";
import { theme } from "../../theme/customTheme";
import { TableContainer } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Table } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Btn from "../../components/Btn";
import { useHistory } from "react-router-dom";

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

const useStyle = makeStyles({
  root: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.secondary.light,
  },
  typo: {
    margin: theme.spacing(5),
  },
  table: {
    minWidth: 700,
  },
});

const Carts = () => {
  const classes = useStyle();
  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    let res = JSON.parse(localStorage.getItem("carts"));
    console.log(res);
    setData(res);
  }, []);
  // console.log(data);

  return (
    <Paper>
      <MainHeader />
      <Container className={classes.root}>
        <Typography variant="h3" className={classes.typo}>
          سبد خرید
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label=" customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ردیف</StyledTableCell>
                <StyledTableCell>نام کالا</StyledTableCell>
                <StyledTableCell> قیمت</StyledTableCell>
                <StyledTableCell>تعداد</StyledTableCell>
                <StyledTableCell>حذف</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id}>
                  <StyledTableCell>{item.item.id}</StyledTableCell>
                  <StyledTableCell>{item.item.name}</StyledTableCell>
                  <StyledTableCell>{item.item.price}</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>
                    <DeleteIcon
                      color="error"
                      onClick={() => {
                        data.splice(item.index, 1);
                        localStorage.setItem("carts", JSON.stringify(data));
                        console.log(data);
                        window.location.reload();
                      }}
                    />
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h3" className={classes.typo}>
          قیمت کل
        </Typography>
        <Btn
          text="نهایی کردن خرید"
          color={"primary"}
          onClick={() => history.push("/profile")}
        />
      </Container>
    </Paper>
  );
};

export default Carts;
