import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";

import { Loading } from "../../components";
import { selectId } from "../../redux/slices/authSlice";
import { fetchCertificateById } from "../../redux/slices/certificateSlice";
import { editUserCart } from "../../redux/slices/ordersSlice";
import "./product-details.css";

const dateOptions = {
  dateStyle: "long",
  timeStyle: "short",
};

const ProductDetails = (props) => {
  const dispatch = useDispatch();
  const userid = useSelector(selectId);
  const certificate = useSelector((state) => state.certificates.certificate);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handleBackClick = () => {
    props.history.action !== "POP"
      ? props.history.goBack()
      : props.history.push("/");
  };

  const handleToCartButtonClick = () => {
    dispatch(editUserCart({ userId: userid, itemId: certificate.id })).then(
      (res) => {
        if (res.payload.status === 201) {
          NotificationManager.success("Item was added to cart");
        }
      }
    );
  };

  const tags = certificate
    ? certificate.tags.map((tag) => "#" + tag.name + " ")
    : [];

  useEffect(() => {
    dispatch(fetchCertificateById(props.match.params.id));
    window.scrollTo(0, 0);
  }, [dispatch]);

  return certificate ? (
    <>
      <div className="product-page">
        <div className="product-page-top__wrap">
          <button className="product-page-top__back" onClick={handleBackClick}>
            <span></span>Back
          </button>
        </div>
        <div className="product-page__grid">
          <div className="product-page__image">
            <img src={certificate.imageUrl} alt={certificate.name} />
          </div>
          <div className="product-page__aside-container">
            <div className="product-page__price">
              <p>{certificate.price} $</p>
            </div>
            {isAdmin ? null : (
              <button
                className="to-cart-btn btn-main-lg hide-mobile"
                onClick={handleToCartButtonClick}
              >
                To cart
              </button>
            )}
          </div>
          <div className="product-page__name">
            <p>{certificate.name}</p>
            <div className="product-page__update-date">
              {new Date(certificate.lastUpdateDate).toLocaleString(
                undefined,
                dateOptions
              )}
            </div>
          </div>
          <table className="product-parameters__table">
            <caption className="product-parameters__caption">
              Characteristics
            </caption>
            <tbody>
              <tr>
                <th>
                  <span className="product-parameters__label">Duration</span>
                  <span className="underscore-dotted"></span>
                </th>
                <td>{certificate.duration} day(s)</td>
              </tr>
              <tr>
                <th>
                  <span className="product-parameters__label">Tags</span>
                  <span className="underscore-dotted"></span>
                </th>
                <td>{tags}</td>
              </tr>
              <tr>
                <th>
                  <span className="product-parameters__label">
                    Creation date
                  </span>
                  <span className="underscore-dotted"></span>
                </th>
                <td>{new Date(certificate.createDate).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          <div className="product-page__description-block">
            <h2 className="description__title">Description</h2>
            <p className="description__content">{certificate.description}</p>
          </div>
        </div>
      </div>
      <div className="product-page__order hide-desktop">
        <button className="to-cart-btn btn-main-lg">To cart</button>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ProductDetails;
