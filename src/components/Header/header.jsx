import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./header.css";
import SearchBar from "../SearchBar/search-bar";

const Header = () => {
  const [searchIsHidden, setSearchIsHidden] = useState(true);
  const userId = useSelector((state) => state.auth.id);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handleOpenSearch = () => {
    document.querySelector(".header__nav-element").classList.add("hidden");
    setSearchIsHidden(false);
  };

  const getSpecificUserRoleLinks = () => {
    return isAdmin ? (
      <>
        <li className="navbar__item">
          <Link to="/control/certificates/new" className="navbar__icon--link">
            <span className="navbar__icon--add"></span>
            <span className="icon__text">Coupon</span>
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/control/tags" className="navbar__icon--link">
            <span className="navbar__icon--tag"></span>
            <span className="icon__text">Tags</span>
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/control/users" className="navbar__icon--link">
            <span className="navbar__icon--users"></span>
            <span className="icon__text">Users</span>
          </Link>
        </li>
      </>
    ) : (
      <li className="navbar__item">
        <Link
          to={userId && isLoggedIn ? "/users/" + userId + "/cart" : "/sign-in"}
          className="navbar__icon--link"
        >
          <span className="navbar__icon--cart"></span>
          <span className="icon__text">Cart</span>
        </Link>
      </li>
    );
  };

  return (
    <header className="header">
      <div className="header__nav-element nav-element">
        <span className="navbar__icon--menu"></span>
        <Link to="/" className="navbar__logo">
          CertBY
        </Link>
        <div className="hide-desktop">
          <span
            className="navbar__icon--search"
            onClick={handleOpenSearch}
          ></span>
        </div>
      </div>
      <SearchBar
        isHidden={searchIsHidden}
        setSearchIsHidden={setSearchIsHidden}
      />
      <div className="header__navbar-pc">
        <ul className="navbar-pc hide-mobile">
          <li className="navbar__item">
            <Link to="/" className="navbar__icon--link">
              <span className="navbar__icon--home"></span>
              <span className="icon__text">Home</span>
            </Link>
          </li>
          {getSpecificUserRoleLinks()}
          <li className="navbar__item">
            <Link
              to={userId && isLoggedIn ? "/users/" + userId : "/sign-in"}
              className="navbar__icon--link"
            >
              <span className="navbar__icon--account navbar__icon--active"></span>
              <span className="icon__text">Account</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
