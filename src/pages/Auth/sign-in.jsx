import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";

import { login, logout, setAuthContext } from "../../redux/slices/authSlice";
import "./auth.css";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const authError = useSelector((state) => state.auth.error);
  const loginStatus = useSelector((state) => state.auth.loginStatus);

  const handleChange = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: email, password: password })).then((res) => {
      if (res.payload.status === 200) {
        NotificationManager.success("Successful authorization");
      }
      dispatch(setAuthContext());
    });
  };

  useEffect(() => {
    if (loginStatus !== "rejected" && authError) {
      dispatch(logout());
    }
  }, [authError]);

  return loginStatus === "succeeded" ? (
    <Redirect to="/" />
  ) : (
    <div className="sign-in-page form__wrap">
      <form onSubmit={handleSubmit}>
        <h2 className="sign-in-page__title">Login</h2>
        <div className="form-block">
          <input
            type="email"
            placeholder="Login"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-block">
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="login__error-msg">
          {authError ? <p>{authError}</p> : null}
        </div>
        <button className="login__btn btn-main-lg">Login</button>
      </form>
      <p className="register-link">
        Need an account? <Link to="/sign-up">Create</Link>
      </p>
    </div>
  );
};

export default SignIn;
