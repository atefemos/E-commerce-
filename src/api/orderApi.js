import axios from "axios";
import { toast } from "react-toastify";
import "../assets/styles.scss";
import "react-toastify/dist/ReactToastify.css";

export const getAllOrders = async () => {
  let res = await axios({
    method: "get",
    url: "http://localhost:5000/orders",
    headers: { "content-type": "application/json" },
  }).catch((err) => toast.error("خطایی رخ داده است!"));
  res && toast.success("کالا ها بارگذاری شد");
  return res;
};
