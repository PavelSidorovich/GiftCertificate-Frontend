import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./footer.css";

const Footer = () => {
  const userId = useSelector((state) => state.auth.id);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__nav">
            <div className="footer__list-wrap">
              <h3 className="footer__header hide-mobile">We in social</h3>
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="https://vk.com/pav_sid" className="icon-vk">
                    Vkontakte
                  </a>
                </li>
                <li className="footer__item">
                  <a
                    href="https://instagram.com/sidorovich_pavel"
                    className="icon-inst"
                  >
                    Instagram
                  </a>
                </li>
                <li className="footer__item">
                  <a
                    href="https://www.linkedin.com/in/pavel-sidorovich-008581213"
                    className="icon-li"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="footer__item">
                  <a href="https://t.me/pav_sid" className="icon-tg">
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__add-info">
            <p className="footer__copyrights">
              <span>2021-2022 &copy; CertBY</span>
              <span className="hide-mobile">
                &nbsp;— cool gift certificate store. All rights reserved.
              </span>
            </p>
          </div>
        </div>
      </footer>
      <ul className="navbar-mobile hide-desktop navbar__menu">
        <li className="navbar__item">
          <Link to="/" className="navbar__icon--link">
            <span className="navbar__icon--home"></span>
          </Link>
        </li>
        <li className="navbar__item">
          <a href="cart.html" className="navbar__icon--link">
            <span className="navbar__icon--cart"></span>
          </a>
        </li>
        <li className="navbar__item">
          <Link
            to={userId && isLoggedIn ? "/users/" + userId : "/sign-in"}
            className="navbar__icon--link"
          >
            <span className="navbar__icon--account navbar__icon--active"></span>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Footer;
