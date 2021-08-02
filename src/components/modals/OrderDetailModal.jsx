import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import Btn from "../Btn";
import MoreIcon from "@material-ui/icons/More";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { theme } from "../../theme/customTheme";
import { useDispatch, useSelector } from "react-redux";

const useStyle = makeStyles({
  root: {
    padding: theme.spacing(3, 8),
  },
  typo: {
    marginBottom: theme.spacing(3),
  },
});

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const OrderDetailModal = ({ selected, ...props }) => {
  const classes = useStyle();

  //------redux------
  const orders = useSelector((state) => state.allOrders);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // dispatch(editeAnOrder());
  };
  console.log(selected.carts);

  return (
    <div>
      <MoreIcon onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <div className={classes.root}>
          <Typography variant="h3" className={classes.typo}>
            نمایش سفارش
          </Typography>
          <Typography variant="body1" className={classes.typo}>
            نام مشتری : {selected?.fName} {selected?.lName}
          </Typography>
          <Typography variant="body1" className={classes.typo}>
            آدرس : {selected?.address}
          </Typography>
          <Typography variant="body1" className={classes.typo}>
            شماره تماس : {selected?.phone}
          </Typography>
          <Typography variant="body1" className={classes.typo}>
            تاریخ سفارش : {selected?.orderDate}
          </Typography>
          <Typography variant="body1" className={classes.typo}>
            تاریخ تحویل : {selected?.deliveryDate}
          </Typography>
          {selected.id > 0 && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>نام کالا</TableCell>
                  <TableCell>قیمت</TableCell>
                  <TableCell>تعداد</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selected?.carts.map((item) => (
                  <TableRow>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <DialogActions>
            <Btn onClick={handleClose} color="primary" text={"تحویل شد"} />
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default OrderDetailModal;
