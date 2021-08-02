import {
  Container,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import MainHeader from "../../components/MainHeader";
import { theme } from "../../theme/customTheme";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "react-persian-calendar-date-picker";
import Btn from "../../components/Btn";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/actions/ordersAction";

//------set styles------
const useStyle = makeStyles({
  root: {
    padding: theme.spacing(4),
  },
  typo: {
    margin: theme.spacing(3),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
    boxShadow: " 5px 5px 10px #b6a9a9, -5px -5px 10px #ffffff",
    borderRadius: "15px",
    border: "1px solid rgba(0,0,0,0.0)",
  },
  input: {
    margin: theme.spacing(2),
    width: "85%",
    [theme.breakpoints.up("md")]: {
      width: "44%",
    },
  },
  date: {
    margin: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  btn: {
    width: 250,
    margin: "0 auto",
  },
  datePicker: {
    position: "absolute",
    top: "100%",
  },
});

const Profile = () => {
  const classes = useStyle();
  const history = useHistory();

  //------redux------
  const orders = useSelector((state) => state.allOrders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const [state, setState] = useState({
    id: null,
    fName: null,
    lName: null,
    address: null,
    phone: null,
  });

  const today = new Date().toLocaleDateString("fa-IR");
  // console.log(today);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("profile", JSON.stringify(state));
    history.push("/payment");
  };

  return (
    <Paper>
      <MainHeader />
      <Container className={classes.root} maxWidth="md">
        <Typography variant="h3" className={classes.typo}>
          نهایی کردن خرید
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            id="fName"
            label="نام"
            name="fName"
            autoComplete="fName"
            autoFocus
            required
            className={classes.input}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="lName"
            label="نام خانوادگی"
            name="lName"
            required
            autoComplete="lName"
            className={classes.input}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="address"
            label="آدرس"
            name="address"
            required
            autoComplete="address"
            className={classes.input}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="phone"
            label="تلفن همراه"
            name="phone"
            required
            autoComplete="phone"
            className={classes.input}
            onChange={handleChange}
          />
          <div className={classes.date}>
            <Typography className={classes.date}>
              انتخاب تاریخ تحویل سفارش:{" "}
            </Typography>
            <DatePicker
              onChange={(e) => {
                setState({
                  ...state,
                  id: orders.length + 1,
                  deliveryDate: `${e.year}/${e.month}/${e.day}`,
                  orderDate: today,
                  status: "waiting",
                  carts: JSON.parse(localStorage.getItem("carts")),
                });
              }}
              className={classes.datePicker}
            />
            <div className={classes.date}>{state.deliveryDate}</div>
          </div>
          <div className={classes.btn}>
            <Btn text={" پرداخت صورتحساب"} />
          </div>
        </form>
      </Container>
    </Paper>
  );
};

export default Profile;
