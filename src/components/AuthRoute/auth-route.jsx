import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { fetchAuthenticatedUser } from "../../redux/slices/authSlice";

const AuthRoute = (props) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.role);
  const userHasRequiredRole = props.requiredRoles.includes(userRole);

  useEffect(() => {
    dispatch(fetchAuthenticatedUser());
  }, [dispatch]);

  const component =
    isLoggedIn && !error && userHasRequiredRole
      ? props.component
      : () =>
          isLoggedIn && !error ? (
            <Redirect to={"/error/forbidden"} />
          ) : (
            <Redirect to="/sign-in" />
          );

  return <Route exact={props.exact} path={props.path} component={component} />;
};

export default AuthRoute;
