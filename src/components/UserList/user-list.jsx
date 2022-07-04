import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import { updateUserById } from "../../redux/slices/userSlice";

const UserList = ({ users, setNeedRefresh }) => {
  const dispatch = useDispatch();

  const handleBlockBtnClick = (e) => {
    const button = e.target;
    const userEmail = button.getAttribute("user-email");
    const wasEnabled = button.classList.contains("status-btn-active");

    dispatch(updateUserById({ email: userEmail, enabled: !wasEnabled })).then(
      (res) => {
        if (res.payload.status === 200) {
          NotificationManager.success("User status was updated");
          setNeedRefresh(true);
        }
      }
    );
  };

  const getStatusButton = (isEnabled, userEmail) => {
    return isEnabled ? (
      <button
        class="status-btn-active"
        user-email={userEmail}
        onClick={handleBlockBtnClick}
      >
        Active
      </button>
    ) : (
      <button
        class="status-btn-inactive"
        user-email={userEmail}
        onClick={handleBlockBtnClick}
      >
        Blocked
      </button>
    );
  };

  const usersMapped = users.map((user) => (
    <tr>
      <td>{user.email}</td>
      <td class="hide-mobile">{user.firstName}</td>
      <td class="hide-mobile">{user.lastName}</td>
      <td>{getStatusButton(user.enabled, user.email)}</td>
      <td>
        <Link to={"/users/" + user.id + "/orders"}>Orders</Link>
      </td>
    </tr>
  ));

  return (
    <table class="users-table">
      <thead>
        <tr>
          <th>Email</th>
          <th class="hide-mobile">First name</th>
          <th class="hide-mobile">Last name</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{usersMapped}</tbody>
    </table>
  );
};

export default UserList;
