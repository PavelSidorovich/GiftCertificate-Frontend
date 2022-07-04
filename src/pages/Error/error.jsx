import React from "react";
import { Link } from "react-router-dom";

import "./error.css";

const Error = () => {
  return (
    <div className="error-page">
      <div className="error-page__status">404</div>
      <div className="error-page__text">
        <p>Ooops...</p>
        <p>something went wrong</p>
      </div>
      <Link to="/" className="btn-link btn-main-lg">
        Home page
      </Link>
    </div>
  );
};

export default Error;
