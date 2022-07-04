import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";

import { editUserCart } from "../../redux/slices/ordersSlice";
import { selectId } from "../../redux/slices/authSlice";
import "./product-list.css";
import AdminButtons from "./admin-buttons";
import UserButtons from "./user-buttons";
import {
  certificateDeletedById,
  deleteCertificateById,
} from "../../redux/slices/certificateSlice";
import ConfirmModal from "../ModalWindow/confirm-modal";
import { useState } from "react";

const ProductList = (props) => {
  const dispatch = useDispatch();
  const userid = useSelector(selectId);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const [confirmModalIsHidden, setConfirmModalIsHidden] = useState(true);
  const [certificateId, setCertificateId] = useState(null);

  const handleToCartButtonClick = (e) => {
    const certificateId = e.target.getAttribute("aria-describedby");

    dispatch(editUserCart({ userId: userid, itemId: certificateId })).then(
      (res) => {
        if (res.payload.status === 201) {
          NotificationManager.success(
            "Certificate was added to cart",
            "Success!"
          );
        } else if (res.payload.status === 401) {
          NotificationManager.info(
            "You need to authorize to add certificates to cart",
            "Info"
          );
        }
      }
    );
  };

  const deleteProductById = (id) => {
    dispatch(deleteCertificateById(id)).then((res) => {
      if (res.payload.status === 204) {
        dispatch(certificateDeletedById(id));
        NotificationManager.success("Coupon was successfully deleted");
      } else if (res.payload.status === 409) {
        NotificationManager.error(
          "Coupon has been already purchased by customers",
          "Deletion error"
        );
      }
      setConfirmModalIsHidden(true);
    });
  };

  const handleProductDelete = (id) => {
    setConfirmModalIsHidden(false);
    setCertificateId(id);
  };

  const certificates =
    props.certificates &&
    props.certificates.map((certificate) => (
      <div key={certificate.id} className="product-card">
        <Link to={"/certificates/" + certificate.id}>
          <img src={certificate.imageUrl} alt="certificate" />
          <div className="product-card__body">
            <p className="product-card__name">{certificate.name}</p>
            <p className="product-card__description">
              {certificate.description}
            </p>
          </div>
        </Link>
        <div className="product-card__bottom">
          <p className="product-card__price">{certificate.price} $</p>
          {isAdmin ? (
            <AdminButtons
              id={certificate.id}
              handleDeleteById={handleProductDelete}
            />
          ) : (
            <UserButtons
              id={certificate.id}
              onClick={handleToCartButtonClick}
            />
          )}
        </div>
      </div>
    ));

  return (
    <>
      {certificates}
      <ConfirmModal
        title="Confirmation"
        message="Are you really want to delete coupon?"
        action={() => deleteProductById(certificateId)}
        isHidden={confirmModalIsHidden}
        setIsHidden={setConfirmModalIsHidden}
      />
    </>
  );
};

export default ProductList;
