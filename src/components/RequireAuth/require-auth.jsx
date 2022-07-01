import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchAuthenticatedUser } from "../../redux/slices/authSlice";

const RequireAuth = (props) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(fetchAuthenticatedUser());
  });

  return isLoggedIn && !error ? props.children : <Redirect to="/sign-in" />;
};

export default RequireAuth;
