/* eslint-disable jsx-a11y/img-redundant-alt */
import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import img from "../../assets/images/payment.jpeg";
import Btn from "../../components/Btn";
import { addAnOrder, getOrders } from "../../store/actions/ordersAction";
import { theme } from "../../theme/customTheme";

//------set styles------
const useStyle = makeStyles({
  root: {
    padding: theme.spacing(4),
    overflowX: "hidden",
  },
  btn: {
    maxWidth: 250,
    minWidth: 100,
  },
  img: {
    display: "block",
    margin: "0 auto",
    width: "80vw",
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
const Payment = () => {
  const classes = useStyle();
  const history = useHistory();

  //------redux------
  const orders = useSelector((state) => state.allOrders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const handleSuccess = () => {
    dispatch(addAnOrder(JSON.parse(localStorage.getItem("profile"))));
    localStorage.removeItem("catrs");
    localStorage.removeItem("profile");
    localStorage.removeItem("carts");
    history.push("/successful");
  };
  const handleUnSuccess = () => {
    history.push("/unsuccessful");
  };

  return (
    <div className={classes.root}>
      <img src={img} alt="payment photo" className={classes.img} />
      <div className={classes.flex}>
        <div className={classes.btn}>
          <Btn text={"پرداخت"} onClick={handleSuccess} />
        </div>
        <div className={classes.btn}>
          <Btn text={"انصراف"} onClick={handleUnSuccess} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
