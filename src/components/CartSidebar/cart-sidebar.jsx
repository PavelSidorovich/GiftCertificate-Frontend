import React from "react";

import "./cart-sidebar.css";

const CartSidebar = ({
  totalPrice,
  itemCount,
  handleCheckout,
  isPurchased,
}) => {
  return (
    <aside className="cart__sidebar">
      <div className="cart__order-top">
        <p className="top__total">
          <span>Total</span>
          <span>{totalPrice} $</span>
        </p>
        <div className="top__count">
          <span>Goods, {itemCount} items</span>
          <span>{totalPrice} $</span>
        </div>
        {isPurchased ? null : (
          <button className="btn-order btn-main-lg" onClick={handleCheckout}>
            Checkout
          </button>
        )}
      </div>
    </aside>
  );
};

export default CartSidebar;
