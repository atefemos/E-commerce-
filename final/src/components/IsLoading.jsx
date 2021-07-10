import React from "react";
import "../assets/IsLoading.scss";

const IsLoading = () => {
  return (
    <div class="loading-container">
      <div class="loading"></div>
      <div id="loading-text">loading</div>
    </div>
  );
};

export default IsLoading;
