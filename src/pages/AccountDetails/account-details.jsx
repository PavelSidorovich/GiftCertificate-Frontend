import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserById, selectUserById } from "../../redux/slices/userSlice";
import { logout } from "../../redux/slices/authSlice";
import "./account-details.css";
import PersonalInfoModal from "../../components/ModalWindow/personal-info-modal";
import BalanceModal from "../../components/ModalWindow/balance-modal";
import EditPasswordModal from "../../components/ModalWindow/edit-password-modal";

const AccountDetails = (props) => {
  const userId = props.match.params.id;
  const dispatch = useDispatch();
  const user = useSelector((state) => selectUserById(state, userId));
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const fetchStatus = useSelector((state) => state.users.status);
  const [balanceModalIsHidden, setBalanceModalIsHidden] = useState(true);
  const [editPasswordModalIsHidden, setEditPasswordModalIsHidden] =
    useState(true);
  const [personalInfoModalIsHidden, setPersonalInfoModalIsHidden] =
    useState(true);

  const handleSignOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch]);

  return (
    <div className="account-page">
      <div className="account-page__user-card">
        <span className="user-card__icon"></span>
        <div className="user-card__info">
          <p className="user-card__name">
            {fetchStatus === "succeeded" && !isAdmin
              ? user.firstName + " " + user.lastName
              : isAdmin
              ? "Admin"
              : null}
          </p>
          <p className="user-card__email">
            Email: {fetchStatus === "succeeded" ? user.email : null}
          </p>
          <p className="user-card__balance">
            Balance:{" "}
            {fetchStatus === "succeeded" && !isAdmin
              ? user.balance + " $"
              : isAdmin
              ? "none"
              : null}
          </p>
          {!isAdmin ? (
            <>
              {" "}
              <button
                className="btn-main-lg user-card__btn"
                onClick={() => setPersonalInfoModalIsHidden(false)}
              >
                <span className="user-card__icon--edit"></span>
                Edit personal info
              </button>
              <button
                className="btn-main-lg user-card__btn"
                onClick={() => setBalanceModalIsHidden(false)}
              >
                <span className="user-card__icon--balance"></span>
                Top up balance
              </button>
            </>
          ) : null}
          <button
            className="btn-main-lg user-card__btn"
            onClick={() => setEditPasswordModalIsHidden(false)}
          >
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
      {fetchStatus === "succeeded" ? (
        <>
          <PersonalInfoModal
            user={user}
            setIsHidden={setPersonalInfoModalIsHidden}
            isHidden={personalInfoModalIsHidden}
          />
          <BalanceModal
            user={user}
            setIsHidden={setBalanceModalIsHidden}
            isHidden={balanceModalIsHidden}
          />
          <EditPasswordModal
            user={user}
            setIsHidden={setEditPasswordModalIsHidden}
            isHidden={editPasswordModalIsHidden}
          />
        </>
      ) : null}
    </div>
  );
};

export default AccountDetails;
