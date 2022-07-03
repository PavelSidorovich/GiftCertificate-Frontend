import React from "react";

const UserButtons = ({ id, onClick }) => {
  return (
    <button className="btn-main-sm" aria-describedby={id} onClick={onClick}>
      To cart
    </button>
  );
};

export default UserButtons;
