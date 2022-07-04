import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Pagination from "../../components/Pagination/pagination";
import { fetchUserOrders } from "../../redux/slices/ordersSlice";
import OrderList from "../../components/OrderList/order-list";
import "./orders.css";

const Orders = (props) => {
  const userId = props.match.params.id;
  const search = useLocation().search;
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const page = new URLSearchParams(search).get("page") || 0;
  const size = new URLSearchParams(search).get("size") || 0;
  const totalPages = useSelector((state) => state.orders.totalOrders);
  const [needRefresh, setNeedRefresh] = useState(false);

  useEffect(() => {
    dispatch(
      fetchUserOrders({ id: userId, params: { page: page, size: size } })
    );

    if (needRefresh) {
      setNeedRefresh(false);
    }
  }, [dispatch, page, size, needRefresh]);

  return (
    <div className="orders-page">
      <div className="orders-page__header-tabs">
        <h1 className="orders-page__header">Orders</h1>
      </div>
      {orders && orders.length === 0 ? (
        <p className="no-items-title">No items found :(</p>
      ) : (
        <>
          <OrderList userId={userId} orders={orders} />
          <Pagination
            url={"/users/" + userId + "/orders"}
            totalPages={totalPages}
            currentPage={page}
            pageSize={size}
          />
        </>
      )}
    </div>
  );
};

export default Orders;
