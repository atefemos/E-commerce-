import {
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  withStyles,
  CardMedia,
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
import noCarts from "../../assets/images/noCarts.png";

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
  paper: {
    backgroundColor: theme.palette.primary.main,
  },
  root: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.secondary.light,
  },
  typo: {
    margin: theme.spacing(3),
  },
  table: {
    minWidth: 700,
  },
  img: {
    width: 500,
    margin: "0 auto",
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
  localStorage.setItem("totalCost", totalCost);

  return (
    <Paper className={classes.paper}>
      <MainHeader />
      <Container className={classes.root}>
        <Typography variant="h3" className={classes.typo}>
          {data ? "سبد خرید" : "سبد خرید شما خالی است !!!"}
        </Typography>
        {data ? (
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
        ) : (
          <div>
            <CardMedia
              image={noCarts}
              alt="no carts"
              component="img"
              className={classes.img}
            />
          </div>
        )}
        {data ? (
          <div>
            <Typography variant="h3" className={classes.typo}>
              قیمت کل : {totalCost.toLocaleString()} تومان
            </Typography>
            <Btn
              text="نهایی کردن خرید"
              color={"primary"}
              onClick={() => history.push("/profile")}
            />
          </div>
        ) : (
          ""
        )}
      </Container>
    </Paper>
  );
};

export default Carts;
