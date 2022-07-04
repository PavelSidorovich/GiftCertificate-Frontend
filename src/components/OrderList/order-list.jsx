import React from "react";
import { Link } from "react-router-dom";

import "./order-list.css";

const OrderList = ({ orders, userId }) => {
  const ordersMapped = orders.map((order) => (
    <Link
      key={order.id}
      className="order-preview"
      to={`/users/${userId}/orders/${order.id}`}
    >
      <div className="order-preview__body">
        <p className="order-preview__title section-header">Order #{order.id}</p>
        <p>Purchase date: {new Date(order.purchaseDate).toLocaleString()}</p>
        <p>Total cost: {order.totalCost} $</p>
      </div>
    </Link>
  ));

  return <div className="orders__container">{ordersMapped}</div>;
};

export default OrderList;
