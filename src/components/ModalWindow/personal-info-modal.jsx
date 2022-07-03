import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";

import { updateUserById } from "../../redux/slices/userSlice";
import validatePersonalInfo from "../../validations/personal-info-validation";
import {
  getFeedback,
  getFieldInputClass,
  getInputFieldIconClass,
} from "../../helpers/FormClasses";
import "./modal-window.css";

const PersonalInfoModal = ({ user, isHidden, setIsHidden }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const resetValues = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setFieldErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      email: user.email,
      firstName: firstName,
      lastName: lastName,
    };
    const errors = validatePersonalInfo(values);

    setFieldErrors(errors);

    if (errors.firstName === "success" && errors.lastName === "success") {
      dispatch(updateUserById(values)).then((res) => {
        if (res.payload.status === 200) {
          NotificationManager.success(
            "User personal info was successfully updated",
            "Success"
          );
        }
      });
      setIsHidden(true);
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
          <p className="section-header">Edit personal info</p>
          <button
            className="modal-btn--close"
            onClick={() => setIsHidden(true)}
          >
            <span></span>
          </button>
        </div>
        <div className="modal__content form__wrap">
          <form onSubmit={handleSubmit}>
            <div className="form-block__container">
              <div className="form-block">
                <div className={getFieldInputClass(fieldErrors.firstName)}>
                  <label htmlFor="firstName">First name</label>
                  <div className="form-block__input-wrapper">
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <span
                      className={getInputFieldIconClass(fieldErrors.firstName)}
                    ></span>
                  </div>
                </div>
                <div className="form-block__feedback">
                  <span className="form-block__feedback--invalid">
                    {getFeedback(fieldErrors.firstName)}
                  </span>
                </div>
              </div>
              <div className="form-block">
                <div className={getFieldInputClass(fieldErrors.lastName)}>
                  <label htmlFor="lastName">Last name</label>
                  <div className="form-block__input-wrapper">
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <span
                      className={getInputFieldIconClass(fieldErrors.lastName)}
                    ></span>
                  </div>
                </div>
                <div className="form-block__feedback">
                  <span className="form-block__feedback--invalid">
                    {getFeedback(fieldErrors.lastName)}
                  </span>
                </div>
              </div>
            </div>
            <button className="login__btn btn-main-lg">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoModal;
