import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./auth.css";

const SignUp = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const handleChange = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    } else if (e.target.type === "passwordConfirm") {
      setPasswordConfirm(e.target.value);
    } else if (e.target.type === "firstName") {
      setFirstName(e.target.value);
    } else if (e.target.type === "lastName") {
      setLastName(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="sign-in-page form__wrap">
      <form onSubmit={handleSubmit}>
        <h2 className="sign-in-page__title">Register</h2>
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
        <div className="form-block">
          <input
            type="password"
            placeholder="Confirm password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-block">
          <input
            type="text"
            placeholder="First name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-block">
          <input
            type="text"
            placeholder="Last name"
            onChange={handleChange}
            required
          />
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
