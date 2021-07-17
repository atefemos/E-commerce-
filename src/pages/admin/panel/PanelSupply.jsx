import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { editAProduct, getProducts } from "../../../store/actions";
import Btn from "../../../components/Btn";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

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
    width: 130,
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
          color="primary"
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

const PanelSuppply = () => {
  const products = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const rows = products.products;
  // const [rows, setRows] = useState(rowsy);
  console.log(rows);
  const [previous, setPrevious] = useState({});
  const classes = useStyles();

  // const onToggleEditMode = (id) => {
  //   setRows((state) => {
  //     return rows.map((row) => {
  //       if (row.id === id) {
  //         return { ...row, isEditMode: !row.isEditMode };
  //       }
  //       return row;
  //     });
  //   });
  // };

  // const onChange = (e, row) => {
  //   if (!previous[row.id]) {
  //     setPrevious((state) => ({ ...state, [row.id]: row }));
  //   }
  //   const value = e.target.value;
  //   const name = e.target.name;
  //   const { id } = row;
  //   const newRows = rows.map((row) => {
  //     if (row.id === id) {
  //       return { ...row, [name]: value };
  //     }
  //     return row;
  //   });
  //   setRows(newRows);
  // };

  // const onRevert = (id) => {
  //   const newRows = rows.map((row) => {
  //     if (row.id === id) {
  //       return previous[id] ? previous[id] : row;
  //     }
  //     return row;
  //   });
  //   setRows(newRows);
  //   setPrevious((state) => {
  //     delete state[id];
  //     return state;
  //   });
  //   onToggleEditMode(id);
  // };

  return (
    <Container className={classes.root}>
      <PanelHeader txt={"مدیریت موجودی و قیمت ها"} btnTxt={"ذخیره"}>
        <p>آیا از ویرایش محصول مورد نظر اطمینان دارید؟</p>
        <Btn text={"بله"} onClick={() => dispatch(editAProduct())} />
        <Btn text={"خیر"} />
      </PanelHeader>
      <AdminHeader />
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ویرایش</TableCell>
            <TableCell align="left">نام کالا</TableCell>
            <TableCell align="left">قیمت</TableCell>
            <TableCell align="left">موجودی</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <>
                    <IconButton
                      aria-label="done"
                      // onClick={() => onToggleEditMode(row.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      // onClick={() => onRevert(row.id)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="delete"
                    // onClick={() => onToggleEditMode(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <CustomTableCell {...{ row, name: "name" }} />
              <CustomTableCell {...{ row, name: "price" }} />
              <CustomTableCell {...{ row, name: "supply" }} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default PanelSuppply;
