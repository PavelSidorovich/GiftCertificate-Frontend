import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import CartList from "../../components/CartList/cart-list";
import CartSidebar from "../../components/CartSidebar/cart-sidebar";
import {
  cartEdited,
  checkoutCart,
  fetchUserCartById,
  fetchUserOrderById,
  fetchUserOrders,
  needRefreshEdited,
} from "../../redux/slices/ordersSlice";

import "./cart.css";

const Cart = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const needRefresh = useSelector((state) => state.orders.needRefresh);
  const totalPrice = useSelector((state) => state.orders.totalPrice);
  const totalItems = useSelector((state) => state.orders.totalItems);
  const cart = useSelector((state) => state.orders.cart);
  const userId = props.match.params.id;
  const orderId = props.match.params.orderId || false;

  console.log(cart);

  const handleCheckout = () => {
    dispatch(checkoutCart(userId)).then((res) => {
      if (res.payload.status === 201) {
        NotificationManager.success(
          "Items from cart were purchased successfully"
        );
        dispatch(cartEdited({}));
        dispatch(needRefreshEdited(true));
      } else if (res.payload.status === 400) {
        NotificationManager.warning(
          "You haven't got enough money to make purchase :("
        );
      }
    });
  };

  useEffect(() => {
    if (orderId) {
      dispatch(fetchUserOrderById({ userId: userId, orderId: orderId }));
    } else if (needRefresh) {
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
                {orderId ? "Order" : "Cart"}
              </h1>
            </div>
            <CartList
              userId={userId}
              items={cart.orderItems}
              isPurchased={orderId}
            />
          </div>
          <CartSidebar
            totalPrice={totalPrice}
            itemCount={totalItems}
            handleCheckout={handleCheckout}
            isPurchased={orderId}
          />
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
