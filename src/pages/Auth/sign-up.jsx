import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { login, setAuthContext, signUp } from "../../redux/slices/authSlice";
import validate from "../../validations/sign-up-validation";
import "./auth.css";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.signUpStatus);
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const error = useSelector((state) => state.auth.error);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const getFieldInputClass = (value) => {
    return (
      "form-block__input" +
      (!value || value === "success" ? "" : " form-block__input--invalid")
    );
  };

  const getInputFieldIconClass = (value) => {
    return !value
      ? ""
      : value === "success"
      ? "success-input-icon"
      : "invalid-input-icon";
  };

  const getFeedback = (value) => {
    return value === "success" ? null : value;
  };

  const handleChange = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "passwordConfirm":
        setPasswordConfirm(e.target.value);
        break;
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      firstName: firstName,
      lastName: lastName,
    };
    const errors = validate(values);

    setFieldErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(signUp(values));
    }
  };

  useEffect(() => {
    if (loginStatus === "succeeded") {
      props.history.push("/");
    }
  }, [loginStatus]);

  useEffect(() => {
    if (error) {
      setFieldErrors({ ...fieldErrors, ...error });
    }
  }, [error, loginStatus]);

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(login({ email: email, password: password })).then(() => {
        dispatch(setAuthContext());
      });
    }
  }, [status]);

  return (
    <div className="sign-in-page form__wrap">
      <form onSubmit={handleSubmit}>
        <h2 className="sign-in-page__title">Register</h2>
        <div className="form-block">
          <div className={getFieldInputClass(fieldErrors.email)}>
            <input
              id="email"
              type="email"
              placeholder="Login"
              onChange={handleChange}
            />
            <span className={getInputFieldIconClass(fieldErrors.email)}></span>
          </div>
          <div className="form-block__feedback">
            <span className="form-block__feedback--invalid">
              {getFeedback(fieldErrors.email)}
            </span>
          </div>
        </div>
        <div className="form-block">
          <div className={getFieldInputClass(fieldErrors.password)}>
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <span
              className={getInputFieldIconClass(fieldErrors.password)}
            ></span>
          </div>
          <div className="form-block__feedback">
            <span className="form-block__feedback--invalid">
              {getFeedback(fieldErrors.password)}
            </span>
          </div>
        </div>
        <div className="form-block">
          <div className={getFieldInputClass(fieldErrors.passwordConfirm)}>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="Confirm password"
              onChange={handleChange}
            />
            <span
              className={getInputFieldIconClass(fieldErrors.passwordConfirm)}
            ></span>
          </div>
          <div className="form-block__feedback">
            <span className="form-block__feedback--invalid">
              {getFeedback(fieldErrors.passwordConfirm)}
            </span>
          </div>
        </div>
        <div className="form-block">
          <div className={getFieldInputClass(fieldErrors.firstName)}>
            <input
              id="firstName"
              type="text"
              placeholder="First name"
              onChange={handleChange}
            />
            <span
              className={getInputFieldIconClass(fieldErrors.firstName)}
            ></span>
          </div>
          <div className="form-block__feedback">
            <span className="form-block__feedback--invalid">
              {getFeedback(fieldErrors.firstName)}
            </span>
          </div>
        </div>
        <div className="form-block">
          <div className={getFieldInputClass(fieldErrors.lastName)}>
            <input
              id="lastName"
              type="text"
              placeholder="Last name"
              onChange={handleChange}
            />
            <span
              className={getInputFieldIconClass(fieldErrors.firstName)}
            ></span>
          </div>
          <div className="form-block__feedback">
            <span className="form-block__feedback--invalid">
              {getFeedback(fieldErrors.lastName)}
            </span>
          </div>
        </div>
        <button className="login__btn btn-main-lg">Register</button>
      </form>
      <p className="register-link">
        Already have an account? <Link to="/sign-in">Sign in</Link>
      </p>
    </div>
  );
};

export default SignUp;
