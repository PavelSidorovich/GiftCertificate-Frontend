import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  filterEdited,
  reloadContent,
  selectFilter,
} from "../../redux/slices/certificateSlice";
import "./product-filter.css";

const ProductFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const loadFilterValues = () => {
    document.querySelector("#name").value = filter.certName
      ? filter.certName
      : "";
    document.querySelector("#tag").value = filter.tagName ? filter.tagName : "";
    document.querySelector("#description").value = filter.description
      ? filter.description
      : "";
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const newFilter = {
      ...filter,
      certName: document.querySelector("#name").value,
      tagName: document.querySelector("#tag").value,
      description: document.querySelector("#description").value,
    };

    dispatch(filterEdited(newFilter));
    dispatch(reloadContent());
    closeFilterMenu();
  };

  const closeFilterMenu = () => {
    document
      .querySelector(".catalog-page__filter")
      .classList.remove("catalog-page__filter--open");
  };

  useEffect(() => {
    loadFilterValues();
  });

  return (
    <aside className="catalog-page__filter">
      <form onSubmit={handleFilterSubmit}>
        <div className="filter__header">
          <h5 className="filter__title">Filters</h5>
          <span
            className="close-icon hide-desktop"
            onClick={closeFilterMenu}
          ></span>
        </div>
        <div className="filter__content form__wrap">
          <div className="form-block-sm">
            <label htmlFor="name">Certificate name</label>
            <input id="name" type="text" />
          </div>
          <div className="form-block-sm">
            <label htmlFor="tag">Tag</label>
            <input id="tag" type="text" />
          </div>
          <div className="form-block-sm">
            <label htmlFor="description">Description</label>
            <textarea id="description"></textarea>
          </div>
        </div>
        <div className="filter__bottom">
          <button className="btn-main-lg filter-btn--apply">
            Show certificates
          </button>
          <button className="filter-btn--reset" type="reset">
            Reset filters
          </button>
        </div>
      </form>
    </aside>
  );
};

export default ProductFilter;
