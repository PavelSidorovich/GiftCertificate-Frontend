import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const UserPages = (props) => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return !isAdmin ? props.children : <Redirect to={"/forbidden"} />;
};

export default UserPages;
