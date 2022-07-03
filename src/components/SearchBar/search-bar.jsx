import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import {
  filterEdited,
  reloadContent,
} from "../../redux/slices/certificateSlice";
import "./search-bar.css";
import {
  needRedirectUpdated,
  searchValueUpdated,
  selectNeedRedirect,
  selectSearchValue,
} from "../../redux/slices/searchSlice";
import { useEffect } from "react";
import { useRef } from "react";

const SearchBar = ({ isHidden, setSearchIsHidden }) => {
  const dispatch = useDispatch();
  const needRedirect = useSelector(selectNeedRedirect);
  const searchValue = useSelector(selectSearchValue);
  const searchInput = useRef(null);

  const debouncedSearch = _.debounce((e) => {
    dispatch(filterEdited({ certName: e.target.value }));
    dispatch(reloadContent());
    dispatch(searchValueUpdated(e.target.value));
    dispatch(needRedirectUpdated(true));
  }, 1000);

  const handleCloseSearch = () => {
    document.querySelector(".header__nav-element").classList.remove("hidden");
    setSearchIsHidden(true);
  };

  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.value = searchValue;
    }
  });

  if (needRedirect) {
    dispatch(needRedirectUpdated(false));
    return <Redirect to="/" />;
  }

  return (
    <div
      className={
        isHidden
          ? "header__search-catalog-pc hide-mobile"
          : "header__search-catalog-pc"
      }
    >
      <input
        ref={searchInput}
        className="search-catalog__input"
        type="text"
        placeholder="Search..."
        onChange={debouncedSearch}
      />
      <button
        className="search-catalog__cancel hide-desktop"
        onClick={handleCloseSearch}
      >
        Cancel
      </button>
    </div>
  );
};

export default SearchBar;
