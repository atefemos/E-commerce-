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
export const getAnorderById = async (id) => {
  let res = await axios({
    method: "get",
    url: `http://localhost:5000/orders/${id}`,
    headers: { "content-type": "application/json" },
  }).catch((err) => toast.error("خطایی رخ داده است!"));
  res && toast.success("داده ها بارگذاری شد");
  return res;
};
