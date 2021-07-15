import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getAllData = async () => {
  let res = await axios({
    method: "get",
    url: "http://localhost:5000/products",
    header: { "content-type": "application/json" },
  }).catch((err) => toast.error("خطایی رخ داده!"));
  toast.success("داده ها بارگذاری شد");
  return res;
};

export const getADataById = async (id) => {
  let res = await axios({
    method: "get",
    url: `http://localhost:5000/products/${id}`,
    header: { "content-type": "application/json" },
  }).catch((err) => toast.error("خطایی رخ داده است!"));
  toast.success("داده ها بارگذاری شد");
  return res;
};
