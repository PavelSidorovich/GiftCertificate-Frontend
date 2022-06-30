import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  filterEdited,
  reloadContent,
} from "../../redux/slices/certificateSlice";
import { promo1, promo2, promo3, promo4 } from "../../assets";
import "./home-banner.css";

const HomeBanner = () => {
  const dispatch = useDispatch();
  const [totalSlides, setTotalSlides] = useState(0);
  const [curSlide, setCurSlide] = useState(0);
  const [moveForward, setMoveForward] = useState(true);

  const isSmallDevice = () => {
    return window.innerWidth < 961;
  };

  const handlePromoClick = (banner) => {
    dispatch(filterEdited({ tagName: banner.getAttribute("aria-label") }));
    dispatch(reloadContent());
  };

  const addPromoClickEventHandlers = () => {
    document.querySelectorAll(".promo__item").forEach((banner) => {
      banner.addEventListener("click", () => handlePromoClick(banner));
    });
  };

  const removePromoClickEventHandlers = () => {
    document.querySelectorAll(".promo__item").forEach((banner) => {
      banner.removeEventListener("click", () => handlePromoClick(banner));
    });
  };

  const handleBulletClick = (bullet) => {
    setCurSlide(parseInt(bullet.getAttribute("slide-number")));
  };

  const addBulletsClickHandlers = () => {
    const slideBullets = document.querySelectorAll(".promo__pagination-bullet");

    slideBullets.forEach((bullet) => {
      bullet.addEventListener("click", () => handleBulletClick(bullet));
    });
  };

  const removeBulletsClickHandlers = () => {
    const slideBullets = document.querySelectorAll(".promo__pagination-bullet");

    slideBullets.forEach((bullet) => {
      bullet.removeEventListener("click", () => handleBulletClick(bullet));
    });
  };

  const showActiveSlide = () => {
    const promoList = document.querySelector(".promo__list");
    const activeBullet = document.querySelector(
      `.promo__pagination .promo__pagination-bullet:nth-child(${curSlide + 1})`
    );
    const slideBullets = document.querySelectorAll(".promo__pagination-bullet");

    slideBullets.forEach((bullet) => {
      bullet.classList.remove("promo__pagination-bullet--active");
    });
    activeBullet.classList.add("promo__pagination-bullet--active");
    promoList.style.transform = `translateX(${-100 * curSlide}%)`;
  };

  const addSlideChangeAction = () => {
    let isForward = moveForward;

    const interval = window.setInterval(() => {
      if (curSlide === 0) {
        isForward = true;
      } else if (curSlide === totalSlides - 1) {
        isForward = false;
      }
      setMoveForward(isForward);
      isForward ? setCurSlide(curSlide + 1) : setCurSlide(curSlide - 1);
    }, 5000);

    return interval;
  };

  const promoBullets = isSmallDevice() ? (
    <>
      <li
        className="promo__pagination-bullet promo__pagination-bullet--active"
        slide-number="0"
      ></li>
      <li className="promo__pagination-bullet" slide-number="1"></li>
      <li className="promo__pagination-bullet" slide-number="2"></li>
      <li className="promo__pagination-bullet" slide-number="3"></li>
    </>
  ) : (
    <>
      <li
        className="promo__pagination-bullet promo__pagination-bullet--active"
        slide-number="0"
      ></li>
      <li className="promo__pagination-bullet" slide-number="1"></li>
    </>
  );

  useEffect(() => {
    const interval = addSlideChangeAction();

    showActiveSlide();

    return () => {
      window.clearInterval(interval);
    };
  }, [curSlide]);

  useEffect(() => {
    const promoItems = document.querySelectorAll(".promo__item");

    isSmallDevice()
      ? setTotalSlides(promoItems.length)
      : setTotalSlides(promoItems.length / 2);
    addPromoClickEventHandlers();
    addBulletsClickHandlers();

    return () => {
      removePromoClickEventHandlers();
      removeBulletsClickHandlers();
    };
  }, []);

  return (
    <div className="main-page__promo">
      <ul className="promo__list">
        <li className="promo__item" aria-label="football">
          <img src={promo1} alt="football collection" />
        </li>
        <li className="promo__item" aria-label="family">
          <img src={promo2} alt="family collection" />
        </li>
        <li className="promo__item" aria-label="car">
          <img src={promo3} alt="car collection" />
        </li>
        <li className="promo__item" aria-label="food">
          <img src={promo4} alt="food collection" />
        </li>
      </ul>
      <ul className="promo__pagination">{promoBullets}</ul>
    </div>
  );
};

export default HomeBanner;
