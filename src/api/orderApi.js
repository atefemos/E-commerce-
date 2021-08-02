import axios from "axios";
import { toast } from "react-toastify";
import "../assets/styles.scss";
import "react-toastify/dist/ReactToastify.css";

//------get all orders from json------
export const getAllOrders = async () => {
  let res = await axios({
    method: "get",
    url: "http://localhost:5000/orders",
    headers: { "content-type": "application/json" },
  }).catch((err) => toast.error("خطایی رخ داده است!"));
  res && toast.success("کالا ها بارگذاری شد");
  return res;
};

//------get a data from json------
export const getAnOrderById = async (id) => {
  let res = await axios({
    method: "get",
    url: `http://localhost:5000/orders/${id}`,
    headers: { "content-type": "application/json" },
  }).catch((err) => toast.error("خطایی رخ داده است!"));
  res && toast.success("داده ها بارگذاری شد");
  return res;
};

//------add a new order to json------
export const addOrder = async (order) => {
  let res = await axios({
    method: "post",
    url: `http://localhost:5000/orders/`,
    headers: { "content-type": "application/json" },
    data: JSON.stringify(order),
  }).catch((err) => toast.error("خطایی رخ داده است!"));
  res && toast.success("سفارش شما با موفقیت ثبت شد!");
  return res;
};

//------put an edited order to json------
export const editAnOrderById = async (id, order) => {
  let res = await axios({
    method: "put",
    url: `http://localhost:5000/orders/${id}`,
    headers: { "content-type": "application/json" },
    data: JSON.stringify(order),
  }).catch((err) => toast.error("خطایی رخ داده است!"));
  res && toast.success("مشحصات کالا به روز شد");
  return res;
};
