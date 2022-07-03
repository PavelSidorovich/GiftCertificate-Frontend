import React from "react";
import { Link } from "react-router-dom";

const AdminButtons = ({ id, handleDeleteById }) => {
  return (
    <div className="product-card__admin-buttons">
      <Link
        to={`/control/certificates/${id}/edit`}
        className="product-card__admin-buttons--edit"
      >
        <span></span>
      </Link>
      <button
        className="product-card__admin-buttons--delete"
        aria-describedby={id}
        onClick={() => handleDeleteById(id)}
      >
        <span></span>
      </button>
    </div>
  );
};

export default AdminButtons;
