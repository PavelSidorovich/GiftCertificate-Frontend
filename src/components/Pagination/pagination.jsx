import React from "react";
import { Link } from "react-router-dom";

import "./pagination.css";

const Pagination = ({ totalPages, currentPage, pageSize, url }) => {
  const getUrlWithParams = (page, pageSize) => {
    return url + "?page=" + page + "&size=" + pageSize;
  };

  const getPageLink = (index) => {
    return index !== "..." ? (
      <Link
        key={index}
        to={getUrlWithParams(index - 1, pageSize)}
        className={
          currentPage == index - 1
            ? "page-number page-number--active"
            : "page-number"
        }
      >
        {index}
      </Link>
    ) : (
      <a className="page-number">...</a>
    );
  };

  const getPaginationButtons = () => {
    const pagination = [];
    let startPage = currentPage - 4;
    let endPage = currentPage + 4;

    startPage = currentPage < 5 ? 1 : currentPage - 4;
    endPage = 8 + startPage;
    endPage = totalPages < endPage ? totalPages : endPage;
    const diff = startPage - endPage + 8;
    startPage -= startPage - diff > 0 ? diff : 0;

    if (startPage > 1) {
      pagination.push(getPageLink(1));
      pagination.push(getPageLink("..."));
    }
    for (let i = startPage; i <= endPage; i++) pagination.push(getPageLink(i));
    if (endPage < totalPages) {
      pagination.push(getPageLink("..."));
      pagination.push(getPageLink(totalPages));
    }

    return pagination;
  };

  return (
    <>
      <div className="page__controls">
        <span>Pages: </span>
        {getPaginationButtons()}
      </div>
      <div className="page__controls">
        <span>Size: </span>
        <Link
          to={getUrlWithParams(currentPage, 10)}
          className={pageSize == 10 ? "page-number--active" : ""}
        >
          10
        </Link>
        <Link
          to={getUrlWithParams(currentPage, 20)}
          className={pageSize == 20 ? "page-number--active" : ""}
        >
          20
        </Link>
        <Link
          to={getUrlWithParams(currentPage, 50)}
          className={pageSize == 50 ? "page-number--active" : ""}
        >
          50
        </Link>
      </div>
    </>
  );
};

export default Pagination;
