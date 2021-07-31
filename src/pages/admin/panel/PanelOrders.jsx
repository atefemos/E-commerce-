import {
  Container,
  makeStyles,
  RadioGroup,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import AdminHeader from "../../../components/AdminHeader";
import PanelHeader from "../../../components/PanelHeader";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAnOrder, getOrders } from "../../../store/actions/ordersAction";
import OrderDetailModal from "../../../components/modals/OrderDetailModal";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { getAllOrders } from "../../../api/orderApi";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "id", numeric: true, label: "ردیف" },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "نام کاربر",
  },
  { id: "totalPrice", numeric: true, label: "مجموع مبلغ" },
  { id: "orderDate", numeric: true, label: "زمان ثبت سفارش" },
  { id: "more", numeric: true, label: "بررسی" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              className={classes.sort}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

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

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(9),
    padding: theme.spacing(4),
    backgroundColor: theme.palette.secondary.light,
  },
  table: {
    minWidth: 700,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
    color: theme.palette.common.white,

    "&:active,&:focus,&:hover": {
      color: theme.palette.common.white,
    },
  },
  sort: {
    "&:active,&:focus,&:hover": {
      color: theme.palette.secondary.main,
    },
  },
}));

const PanelOrders = () => {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const orders = useSelector((state) => state.allOrders.orders);
  // const ordery = useSelector((state) => state.allOrders.order);
  const dispatch = useDispatch();

  // console.log(ordery);

  useEffect(() => {
    (async () => {
      const res = await getAllOrders();
      await setRows(res.data);
    })();
  }, []);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const deliveredOrders = orders.filter((item) => item.status === "delivered");
  const waitingOrders = orders.filter((item) => item.status === "waiting");

  const handleChange = (e) => {
    e.target.value === "waiting"
      ? setRows(waitingOrders)
      : setRows(deliveredOrders);
  };

  //------sort------
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  //------pagination------
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container className={classes.root}>
      <AdminHeader />
      <PanelHeader txt={"مدیریت سفارش ها"}>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          onChange={handleChange}
        >
          <FormControlLabel
            value="delivered"
            control={<Radio color="primary" />}
            label="سفارش های تحویل شده"
            labelPlacement="start"
          />
          <FormControlLabel
            value="waiting"
            control={<Radio color="primary" />}
            label="سفارش های در انتطار ارسال "
            labelPlacement="start"
          />
        </RadioGroup>
      </PanelHeader>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover key={row.id}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">{row.person}</TableCell>
                    <TableCell align="left">
                      {Number(row.totalPrice).toLocaleString()}
                    </TableCell>
                    <TableCell align="left">{row.orderDate}</TableCell>
                    <TableCell align="left">
                      <div onClick={() => dispatch(getAnOrder(row.id))}>
                        <OrderDetailModal />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
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
    </Container>
  );
};

export default PanelOrders;
