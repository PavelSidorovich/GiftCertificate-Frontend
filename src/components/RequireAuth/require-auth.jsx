import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const RequireAuth = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? props.children : <Redirect to="/sign-in" />;
};

export default RequireAuth;
