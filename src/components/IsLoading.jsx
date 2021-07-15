import React from "react";
import "../assets/isLoading.scss";

const IsLoading = () => {
  return (
    <div class="loading-container">
      <div class="loading"></div>
      <div id="loading-text">درحال دریافت داده ها</div>
    </div>
  );
};

export default IsLoading;
