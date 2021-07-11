import axios from "axios";
import { toast } from "react-toastify";

export const login = async (email, password) => {
  let res = await axios({
    method: "post",
    url: "https://reqres.in/api/login",
    headers: { "content-type": "application/json" },
    data: JSON.stringify({
      email,
      password,
    }),
  });
  if (res) {
    toast.success("با موفقیت وارد شدید.");
    return res;
  } else {
    toast.error("ایمیل یا رمز عبور اشتباه است");
  }
};
