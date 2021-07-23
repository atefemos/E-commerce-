import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import PanelHeader from "../../../components/PanelHeader";
import AdminHeader from "../../../components/AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import {
  editAProduct,
  getProducts,
} from "../../../store/actions/productsActions";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

//------Set Style------

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
    overflowX: "auto",
    padding: theme.spacing(4),
    backgroundColor: theme.palette.secondary.light,
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 100,
    height: 40,
    fontSize: 14,
  },
  input: {
    width: 130,
    height: 40,
    color: theme.palette.primary.light,
  },
}));

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

const PanelSuppply = () => {
  //------Redux------
  const products = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();
  //------Style------
  const classes = useStyles();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const [rows, setRows] = useState([]);

  useEffect(() => async () => {
    await setRows(products.products);
  });

  const [previous, setPrevious] = useState({});

  const onToggleEditMode = (id) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };
  const onRevert = (id) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

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
      <PanelHeader txt={"مدیریت موجودی و قیمت ها"} btnTxt={"ذخیره"}>
        {/* <p>آیا از ویرایش محصول مورد نظر اطمینان دارید؟</p>
        <Btn text={"بله"} onClick={() => dispatch(editAProduct())} />
        <Btn text={"خیر"} /> */}
      </PanelHeader>
      <AdminHeader />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ردیف</StyledTableCell>
              <StyledTableCell align="left">نام کالا</StyledTableCell>
              <StyledTableCell align="left">قیمت</StyledTableCell>
              <StyledTableCell align="left">موجودی</StyledTableCell>
              <StyledTableCell align="left">ویرایش</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.id}>
                <CustomTableCell {...{ row, name: "id", onChange }} />
                <CustomTableCell {...{ row, name: "name", onChange }} />
                <CustomTableCell {...{ row, name: "price", onChange }} />
                <CustomTableCell {...{ row, name: "supply", onChange }} />
                <TableCell className={classes.selectTableCell}>
                  {row.isEditMode ? (
                    <>
                      <IconButton
                        aria-label="done"
                        onClick={() => onToggleEditMode(row.id)}
                      >
                        <DoneIcon />
                      </IconButton>
                      <IconButton
                        aria-label="revert"
                        onClick={() => onRevert(row.id)}
                      >
                        <RevertIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton
                      aria-label="delete"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
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
    </Container>
  );
};

export default PanelSuppply;
