import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Pagination from "../../components/Pagination/pagination";
import UserList from "../../components/UserList/user-list";
import { fetchUsers } from "../../redux/slices/userSlice";

import "./users.css";

const Users = () => {
  const search = useLocation().search;
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const page = new URLSearchParams(search).get("page") || 0;
  const size = new URLSearchParams(search).get("size") || 0;
  const totalPages = useSelector((state) => state.users.totalPages);
  const [needRefresh, setNeedRefresh] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers({ page: page, size: size }));

    if (needRefresh) {
      setNeedRefresh(false);
    }
  }, [dispatch, page, size, needRefresh]);

  return (
    <div class="users-page">
      <div class="users-page__header-tabs">
        <h1 class="users-page__header">Users</h1>
      </div>
      <UserList users={users} setNeedRefresh={setNeedRefresh} />
      <Pagination
        url="/control/users"
        totalPages={totalPages}
        currentPage={page}
        pageSize={size}
      />
    </div>
  );
};

export default Users;
