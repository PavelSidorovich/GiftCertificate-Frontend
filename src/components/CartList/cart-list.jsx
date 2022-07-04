import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./cart-list.css";
import {
  editUserCart,
  removeFromUserCart,
} from "../../redux/slices/ordersSlice";

const CartList = ({ userId, items, isPurchased }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = (e) => {
    dispatch(
      removeFromUserCart({
        userId: userId,
        itemId: e.target.getAttribute("aria-describedby"),
      })
    );
  };

  const editCartItemAmount = (e, isIncrement) => {
    const ceritificateId = e.target.getAttribute("aria-describedby");
    const curItemAmount = parseInt(
      document.querySelector(
        ".count__numeric[data-id='" + ceritificateId + "']"
      ).value
    );

    const amount = isIncrement ? curItemAmount + 1 : curItemAmount - 1;

    dispatch(
      editUserCart({
        userId: userId,
        itemId: ceritificateId,
        amount: amount < 1 ? 1 : amount > 99 ? 99 : amount,
      })
    );
  };

  const handleItemAmountIncrement = (e) => {
    editCartItemAmount(e, true);
  };

  const handleItemAmountDecrement = (e) => {
    editCartItemAmount(e, false);
  };

  const cartItems = items.map((item) => (
    <div className="cart__item-wrap" key={item.id}>
      <div className="cart__item">
        <Link
          to={"/certificates/" + item.certificate.id}
          className="cart__item-img"
        >
          <img src={item.certificate.imageUrl} alt="certificate" />
        </Link>
        <div className="cart__item-info">
          <div className="cart__item-name">{item.certificate.name}</div>
          <div className="cart__item-price hide-desktop">
            {item.certificate.price * item.amount} $
          </div>
          <p className="cart__item-description">
            {item.certificate.description}
          </p>
          <p className="cart__item-properties">
            Duration: {item.certificate.duration} day(s)
          </p>
        </div>
      </div>
      <div className="cart__item-controls">
        <div className="count__wrap">
          {isPurchased ? null : (
            <button
              className="count__minus disabled"
              onClick={handleItemAmountDecrement}
            >
              <span aria-describedby={item.certificate.id}></span>
            </button>
          )}
          <input
            type="text"
            maxLength="2"
            className="count__numeric"
            value={isPurchased ? "X " + item.amount : item.amount}
            data-id={item.certificate.id}
            readOnly
          />
          {isPurchased ? null : (
            <button className="count__plus" onClick={handleItemAmountIncrement}>
              <span aria-describedby={item.certificate.id}></span>
            </button>
          )}
        </div>
        {isPurchased ? null : (
          <div className="cart__item-btn">
            <button className="btn__del">
              <span
                onClick={handleRemoveItem}
                aria-describedby={item.certificate.id}
              >
                Delete
              </span>
            </button>
          </div>
        )}
      </div>
      <div className="cart__item-price hide-mobile">
        {(item.certificate.price * item.amount).toFixed(2)} $
      </div>
    </div>
  ));

  return <div className="cart__list">{cartItems}</div>;
};

export default CartList;
