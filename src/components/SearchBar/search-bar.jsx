import React from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";

import {
  filterEdited,
  reloadContent,
} from "../../redux/slices/certificateSlice";
import "./search-bar.css";

const SearchBar = ({ isHidden, setSearchIsHidden }) => {
  const dispatch = useDispatch();

  const debouncedSearch = _.debounce((e) => {
    dispatch(filterEdited({ certName: e.target.value }));
    dispatch(reloadContent());
  }, 1000);

  const handleCloseSearch = () => {
    document.querySelector(".header__nav-element").classList.remove("hidden");

    setSearchIsHidden(true);
  };

  return (
    <div
      className={
        isHidden
          ? "header__search-catalog-pc hide-mobile"
          : "header__search-catalog-pc"
      }
    >
      <input
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
