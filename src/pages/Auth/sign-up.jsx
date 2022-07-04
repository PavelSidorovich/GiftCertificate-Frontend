import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import { handleInputChange } from "../../helpers/FormClasses";
import { login, setAuthContext, signUp } from "../../redux/slices/authSlice";

import validate from "../../validations/sign-up-validation";
import "./auth.css";
import { InputBlock } from "../../components";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.signUpStatus);
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const error = useSelector((state) => state.auth.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

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
      dispatch(signUp(values)).then((res) => {
        if (res.payload.status === 200) {
          NotificationManager.success("Successful registration");
        }
      });
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
        <InputBlock
          id="email"
          type="email"
          value={email}
          error={fieldErrors.email}
          placeholder="Login"
          autoComplete="on"
          onChange={(e) =>
            handleInputChange(e, setEmail, fieldErrors, setFieldErrors)
          }
        />
        <InputBlock
          id="password"
          type="password"
          value={password}
          placeholder="Password"
          error={fieldErrors.password}
          onChange={(e) =>
            handleInputChange(e, setPassword, fieldErrors, setFieldErrors)
          }
        />
        <InputBlock
          id="passwordConfirm"
          type="password"
          value={passwordConfirm}
          placeholder="Confirm password"
          error={fieldErrors.passwordConfirm}
          onChange={(e) =>
            handleInputChange(
              e,
              setPasswordConfirm,
              fieldErrors,
              setFieldErrors
            )
          }
        />
        <InputBlock
          id="firstName"
          type="text"
          value={firstName}
          placeholder="First name"
          error={fieldErrors.firstName}
          autoComplete="off"
          onChange={(e) =>
            handleInputChange(e, setFirstName, fieldErrors, setFieldErrors)
          }
        />
        <InputBlock
          id="lastName"
          type="text"
          value={lastName}
          placeholder="Last name"
          error={fieldErrors.lastName}
          autoComplete="off"
          onChange={(e) =>
            handleInputChange(e, setLastName, fieldErrors, setFieldErrors)
          }
        />
        <button className="login__btn btn-main-lg">Register</button>
      </form>
      <p className="register-link">
        Already have an account? <Link to="/sign-in">Sign in</Link>
      </p>
    </div>
  );
};

export default SignUp;
