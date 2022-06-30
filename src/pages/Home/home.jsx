import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import {
  HomeBanner,
  Loading,
  ProductFilter,
  ProductList,
  ProductSorting,
} from "../../components";
import {
  fetchCertificates,
  incrementPage,
  lastScrollYEdited,
  selectFilter,
} from "../../redux/slices/certificateSlice";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const fetchStatus = useSelector((state) => state.certificates.status);
  const certificates = useSelector((state) => state.certificates.certificates);
  const filter = useSelector(selectFilter);
  const lastPageOffset = useSelector((state) => state.certificates.pageOffset);
  const lastScrollY = useSelector((state) => state.certificates.lastScrollY);
  const hasMore = useSelector((state) => state.certificates.hasMore);

  const debouncedInfiniteScroll = _.debounce(() => {
    dispatch(incrementPage());
    dispatch(fetchCertificates(filter));
  }, 1000);

  const debouncedScrollPosition = _.debounce(() => {
    dispatch(lastScrollYEdited(window.scrollY));
  }, 1000);

  const handleToTopButtonClick = () => {
    window.scrollTo(0, 0);
  };

  window.onscroll = function() {
    if (
      this.innerHeight + this.scrollY >= document.body.scrollHeight - 200 &&
      hasMore
    ) {
      debouncedInfiniteScroll();
    }
    debouncedScrollPosition();
  };

  useEffect(() => {
    if (fetchStatus === "idle") {
      const tmpFilter = filter;

      if (lastPageOffset !== 0) {
        tmpFilter.page = 0;
        tmpFilter.size = lastPageOffset * 20;
      }
      dispatch(fetchCertificates(tmpFilter)).then(() => {
        dispatch(incrementPage());
        window.scrollTo(0, lastScrollY);
      });
    }
  }, [fetchStatus, dispatch]);

  return (
    <div className="catalog-page">
      <ProductFilter />
      <div className="catalog-page__main">
        <ProductSorting />
        <div className="catalog-page__content">
          <HomeBanner />
          {fetchStatus === "succeeded" && !certificates.length ? (
            <p className="no-items-title">No items found :(</p>
          ) : (
            <ProductList certificates={certificates} />
          )}
          {fetchStatus === "loading" ? <Loading /> : null}
        </div>
        <button className="to-top-btn" onClick={handleToTopButtonClick}>
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default Home;
