import React from "react";
import Btn from "../components/Btn";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="root fullVH">
      <div className="box">
        <h3>صفحه مورد نظر شما پیدا نشد.</h3>
        <p>لطفا به پالیز استور برگردید ...</p>
        <Link to={"/"} className="link">
          <Btn text={"بازگشت به پالیز استور"} color={"secondary"} />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
