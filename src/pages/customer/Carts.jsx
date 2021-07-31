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

//------set styles------
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
    setData(res);
  }, []);

  //------make array of prices------
  const prices = [];
  data && data.map((item) => prices.push(+item.price * item.count));

  //------calculate totel cost------
  const totalCost = prices.reduce((sum, curr) => sum + curr, 0);

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
              {data &&
                data.map((item, index) => (
                  <TableRow key={item.id}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{item.name}</StyledTableCell>
                    <StyledTableCell>
                      {Number(item.price).toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell>{item.count}</StyledTableCell>
                    <StyledTableCell>
                      <DeleteIcon
                        color="error"
                        onClick={() => {
                          data.splice(index, 1);
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
          قیمت کل : {totalCost.toLocaleString()} تومان
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
