import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserById, selectUserById } from "../../redux/slices/userSlice";
import { logout } from "../../redux/slices/authSlice";
import "./account-details.css";

const AccountDetails = (props) => {
  const userId = props.match.params.id;
  const dispatch = useDispatch();
  const user = useSelector((state) => selectUserById(state, userId));
  const fetchStatus = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const handleSignOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    // if (fetchStatus === "idle") {
    dispatch(fetchUserById(userId));
    // }
  }, [dispatch]);

  return (
    <div className="account-page">
      <div className="account-page__user-card">
        <span className="user-card__icon"></span>
        <div className="user-card__info">
          <p className="user-card__name">
            {fetchStatus === "succeeded"
              ? user.firstName + " " + user.lastName
              : null}
          </p>
          <p className="user-card__email">
            Email: {fetchStatus === "succeeded" ? user.email : null}
          </p>
          <p className="user-card__balance">
            Balance: {fetchStatus === "succeeded" ? user.balance : null} $
          </p>
          <button className="btn-main-lg user-card__btn">
            <span className="user-card__icon--edit"></span>
            Edit personal info
          </button>
          <button className="btn-main-lg user-card__btn">
            <span className="user-card__icon--balance"></span>
            Top up balance
          </button>
          <button className="btn-main-lg user-card__btn">
            <span className="user-card__icon--password"></span>
            Change password
          </button>
          <button
            className="btn-main-lg user-card__btn"
            onClick={handleSignOut}
          >
            <span className="user-card__icon--logout"></span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
