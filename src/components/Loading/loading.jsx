import React from "react";

import "./loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Загрузка</p>
    </div>
  );
};

export default Loading;
