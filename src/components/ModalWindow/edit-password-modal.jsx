import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";

import { changeUserPassword } from "../../redux/slices/userSlice";
import {
  getFeedback,
  getFieldInputClass,
  getInputFieldIconClass,
} from "../../helpers/FormClasses";
import "./modal-window.css";
import validatePassword from "../../validations/password-validation";
import { logout } from "../../redux/slices/authSlice";

const EditPasswordModal = ({ user, isHidden, setIsHidden }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const [fieldErrors, setFieldErrors] = useState({});
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const resetValues = () => {
    setPassword("");
    setPasswordConfirm("");
    setFieldErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      email: user.email,
      password: password,
      passwordConfirm: passwordConfirm,
    };
    const errors = validatePassword(values);

    setFieldErrors(errors);

    if (errors.password === "success" && errors.passwordConfirm === "success") {
      dispatch(changeUserPassword(values)).then((res) => {
        if (res.payload.status === 204) {
          NotificationManager.warning("Password was changed", "Warning");
        }
      });
      setIsHidden(true);
      dispatch(logout());
    }
  };

  const showModalIfNotHidden = () => {
    const classList = modalRef.current.classList;

    isHidden ? classList.add("modal-hidden") : classList.remove("modal-hidden");
  };

  useEffect(() => {
    showModalIfNotHidden();
    resetValues();
  }, [isHidden]);

  return (
    <div ref={modalRef} className="modal modal-hidden">
      <div className="modal__body">
        <div className="modal__header">
          <p className="section-header">Change password</p>
          <button
            className="modal-btn--close"
            onClick={() => setIsHidden(true)}
          >
            <span></span>
          </button>
        </div>
        <div className="modal__content form__wrap">
          <form onSubmit={handleSubmit}>
            <div className="form-block">
              <div className={getFieldInputClass(fieldErrors.password)}>
                <label htmlFor="balance">New password</label>
                <div className="form-block__input-wrapper">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className={getInputFieldIconClass(fieldErrors.password)}
                  ></span>
                </div>
              </div>
              <div className="form-block__feedback">
                <span className="form-block__feedback--invalid">
                  {getFeedback(fieldErrors.password)}
                </span>
              </div>
            </div>
            <div className="form-block">
              <div className={getFieldInputClass(fieldErrors.passwordConfirm)}>
                <label htmlFor="balance">Confirm password</label>
                <div className="form-block__input-wrapper">
                  <input
                    id="passwordConfirm"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                  <span
                    className={getInputFieldIconClass(
                      fieldErrors.passwordConfirm
                    )}
                  ></span>
                </div>
              </div>
              <div className="form-block__feedback">
                <span className="form-block__feedback--invalid">
                  {getFeedback(fieldErrors.passwordConfirm)}
                </span>
              </div>
            </div>
            <button className="login__btn btn-main-lg">Change password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPasswordModal;
