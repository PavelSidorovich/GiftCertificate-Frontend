import React from "react";

const Users = () => {
  return (
    <div class="users-page">
      <div class="users-page__header-tabs">
        <h1 class="users-page__header" data-count="2">
          Users
        </h1>
      </div>
      <table class="users-table">
        <tbody>
          <tr>
            <th>Email</th>
            <th class="hide-mobile">First name</th>
            <th class="hide-mobile">Last name</th>
            <th>Status</th>
            <th></th>
          </tr>
          <tr>
            <td>pavsid2001@mail.ru</td>
            <td class="hide-mobile">Pavel</td>
            <td class="hide-mobile">Sidorovich</td>
            <td>
              <button class="status-btn-active">Active</button>
            </td>
            <td>
              <a>Orders</a>
            </td>
          </tr>
          <tr>
            <td>pavsid2001@mail.ru</td>
            <td class="hide-mobile">Pavel</td>
            <td class="hide-mobile">Sidorovich</td>
            <td>
              <button class="status-btn-inactive">Blocked</button>
            </td>
            <td>
              <a>Orders</a>
            </td>
          </tr>
          <tr>
            <td>pavsid2001@mail.ru</td>
            <td class="hide-mobile">Pavel</td>
            <td class="hide-mobile">Sidorovich</td>
            <td>
              <button class="status-btn-active">Active</button>
            </td>
            <td>
              <a>Orders</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="page__controls">
        <span>Pages: </span>
        <a class="page-number">1</a>
        <a class="page-number">2</a>
        <a>...</a>
        <a class="page-number">23</a>
      </div>
    </div>
  );
};

export default Users;
