import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartList from "../../components/CartList/cart-list";
import CartSidebar from "../../components/CartSidebar/cart-sidebar";
import {
  editUserCart,
  fetchUserCartById,
  needRefreshEdited,
} from "../../redux/slices/ordersSlice";

import "./cart.css";

const Cart = (props) => {
  const dispatch = useDispatch();
  const needRefresh = useSelector((state) => state.orders.needRefresh);
  const totalPrice = useSelector((state) => state.orders.totalPrice);
  const totalItems = useSelector((state) => state.orders.totalItems);
  const cart = useSelector((state) => state.orders.cart);
  const userId = props.match.params.id;

  useEffect(() => {
    if (needRefresh) {
      dispatch(fetchUserCartById(userId)).then(() =>
        dispatch(needRefreshEdited(false))
      );
    }
  }, [needRefresh]);

  return (
    <div className="cart-page">
      {cart.orderItems && cart.orderItems.length ? (
        <>
          <div className="cart__content">
            <div className="cart__header-tabs">
              <h1 className="cart-section__header" data-count={totalItems}>
                Cart
              </h1>
            </div>
            <CartList userId={userId} items={cart.orderItems} />
          </div>
          <CartSidebar totalPrice={totalPrice} itemCount={totalItems} />
        </>
      ) : (
        <div className="cart-page__cart-empty">
          <h1 className="section-header">Cart is empty</h1>
          <p className="cart-empty__text">
            Start with home page or use search to find something specific
          </p>
          <Link to="/" className="btn-link btn-main-lg">
            Home page
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
