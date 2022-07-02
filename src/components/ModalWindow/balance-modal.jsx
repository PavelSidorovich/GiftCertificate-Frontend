import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { updateUserById } from "../../redux/slices/userSlice";
import {
  getFeedback,
  getFieldInputClass,
  getInputFieldIconClass,
} from "../../helpers/form-classes";
import "./modal-window.css";
import validateBalance from "../../validations/balance-validation";

const BalanceModal = ({ user, isHidden, setIsHidden }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const [fieldErrors, setFieldErrors] = useState({});
  const [balance, setBalance] = useState("");

  const resetValues = () => {
    setBalance("");
    setFieldErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      email: user.email,
      balance: balance,
    };
    const errors = validateBalance(values);

    setFieldErrors(errors);

    if (errors.balance === "success") {
      dispatch(updateUserById(values));
      setIsHidden(true);
    }
  };

  const showModalIfNotHidden = () => {
    const classList = modalRef.current.classList;

    isHidden ? classList.add("hidden") : classList.remove("hidden");
  };

  useEffect(() => {
    showModalIfNotHidden();
    resetValues();
  }, [isHidden]);

  return (
    <div ref={modalRef} className="modal hidden">
      <div className="modal__body">
        <div className="modal__header">
          <p className="section-header">Top up balance</p>
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
              <div className={getFieldInputClass(fieldErrors.balance)}>
                <label htmlFor="balance">Sum</label>
                <div className="form-block__input-wrapper">
                  <input
                    id="balance"
                    type="text"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    autoComplete="off"
                  />
                  <span
                    className={getInputFieldIconClass(fieldErrors.balance)}
                  ></span>
                </div>
              </div>
              <div className="form-block__feedback">
                <span className="form-block__feedback--invalid">
                  {getFeedback(fieldErrors.balance)}
                </span>
              </div>
            </div>
            <button className="login__btn btn-main-lg">Top up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BalanceModal;
