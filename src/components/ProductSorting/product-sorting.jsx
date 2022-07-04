import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  filterEdited,
  selectFilter,
  reloadContent,
} from "../../redux/slices/certificateSlice";
import "./product-sorting.css";

const ProductSorting = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleSortingChange = (e) => {
    const newFilter = { ...filter, sortByCreateDate: null, sortByName: null };

    dispatch(
      filterEdited({
        ...newFilter,
        [e.target.getAttribute("aria-label")]:
          e.target.getAttribute("sort-type"),
      })
    );
    dispatch(reloadContent());
    document
      .querySelectorAll(".select-filter__item")
      .forEach((button) => button.classList.remove("active-filter"));
    e.target.classList.add("active-filter");
    document.querySelector(".select-filter__value").innerHTML =
      e.target.innerHTML;
    document.querySelector(".select-filter__list").classList.toggle("hidden");
  };

  const toggleSortingMenu = () => {
    document.querySelector(".select-filter__list").classList.toggle("hidden");
  };

  const openFilterMenu = () => {
    document
      .querySelector(".catalog-page__filter")
      .classList.add("catalog-page__filter--open");
  };

  useEffect(() => {
    const sortByName = filter.sortByName;
    const sortByCreateDate = filter.sortByCreateDate;

    const activeSorting = sortByName
      ? document.querySelector(
          `.select-filter__item[aria-label='sortByName'][sort-type='${sortByName}']`
        )
      : sortByCreateDate
      ? document.querySelector(
          `.select-filter__item[aria-label='sortByCreateDate'][sort-type='${sortByCreateDate}']`
        )
      : null;
    if (activeSorting) {
      activeSorting.classList.add("active-filter");
      document.querySelector(".select-filter__value").innerHTML =
        activeSorting.innerHTML;
    }
  });

  return (
    <div className="sorter-mobile">
      <span className="sorter-mobile__title">Sort by:</span>
      <div className="sorter-mobile__select">
        <div className="select-filter">
          <div
            className="select-filter__value hide-desktop"
            onClick={toggleSortingMenu}
          >
            By update desc
          </div>
          <div className="select-filter__list hidden">
            <button
              className="select-filter__item"
              aria-label="sortByCreateDate"
              sort-type="ASC"
              onClick={handleSortingChange}
            >
              By update asc
            </button>
            <button
              className="select-filter__item"
              aria-label="sortByCreateDate"
              sort-type="DESC"
              onClick={handleSortingChange}
            >
              By update desc
            </button>
            <button
              className="select-filter__item"
              aria-label="sortByName"
              sort-type="ASC"
              onClick={handleSortingChange}
            >
              By name asc
            </button>
            <button
              className="select-filter__item"
              aria-label="sortByName"
              sort-type="DESC"
              onClick={handleSortingChange}
            >
              By name desc
            </button>
          </div>
        </div>
      </div>
      <div
        className="sorter-mobile__filter hide-desktop"
        onClick={openFilterMenu}
      ></div>
    </div>
  );
};

export default ProductSorting;
