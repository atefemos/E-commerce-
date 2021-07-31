import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/actions/modalsAction";
import { getAnOrder } from "../../store/actions/ordersAction";
import Btn from "../Btn";
import BasicModal from "./BasicModal";

const OrderDetailModal = ({ ...props }) => {
  const [select, setSelect] = useState(null);

  //   //------redux------
  // const orders = useSelector((state) => state.allOrders);
  const dispatch = useDispatch();

  //   const orders = products.orders;
  // useEffect(() => {
  //   setSelect(selected);
  // });

  // console.log(selected);
  //------handle functions------
  const handleDeliver = () => {
    dispatch(closeModal());
  };

  return (
    <BasicModal btnTxt={"بررسی سفارش"}>
      <Typography variant="body1">نمایش سفارش</Typography>
      <Typography variant="body1">نام مشتری : </Typography>
      <Typography variant="body1">آدرس : </Typography>
      <Typography variant="body1">تلفن : </Typography>
      <Typography variant="body1">زمان تحویل : </Typography>
      <Typography variant="body1">زمان سفارش : </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>کالا</TableCell>
            <TableCell>قیمت</TableCell>
            <TableCell>تعداد</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell></TableCell>
        </TableBody>
      </Table>
      <Btn text={"تحویل شد"} onClick={handleDeliver} />
    </BasicModal>
  );
};

export default OrderDetailModal;
