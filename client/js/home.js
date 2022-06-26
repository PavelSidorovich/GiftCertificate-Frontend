function getCertificates(contentPage, pageSize) {
  const page = contentPage >= 0 ? contentPage : getPageOffset();
  const size = getParamQuery("size", pageSize ? pageSize : 20);
  const filter = mapFilterToQuery(getFilter());
  const sorting = getSorting();

  return fetch(
    "http://192.168.100.9:3000/certificates?page=" +
      page +
      size +
      filter +
      sorting
  )
    .then((res) => res.json())
    .then((data) => loadCertificatesOnPage(data, page));
}

function loadCertificatesOnPage(certificateList, page) {
  const certificateContainer = document.querySelector(".catalog-page__content");

  if (
    !certificateList.content.length &&
    !document.querySelectorAll(".product-card").length
  ) {
    removeElementsByClass("product-card");
    certificateContainer.insertAdjacentHTML(
      "beforeend",
      `<p class="no-items-title">No items found</p>`
    );
  }
  if (page >= certificateList.totalPages) {
    return;
  }

  certificateList.content.forEach((certificate) => {
    certificateContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="product-card">
                <a href="product.html">
                  <img
                    src="${certificate.imageUrl}"
                    alt="certificate image"
                  />
                  <div class="product-card__body">
                    <p class="product-card__name">${certificate.name}</p>
                    <p class="product-card__description">
                        ${certificate.description}
                    </p>
                  </div>
                </a>
                <div class="product-card__bottom">
                  <p class="product-card__price">${certificate.price} $</p>
                  <button class="btn-main-sm">To cart</button>
                </div>
              </div>`
    );
  });
}

function addBannerClickHandler() {
  document.querySelectorAll(".promo__item").forEach((banner) => {
    banner.addEventListener("click", (e) => {
      window.localStorage.setItem(
        "filter-tag",
        banner.getAttribute("aria-details")
      );
      fillFilterForm();
      reloadCertificatesOnPage();
    });
  });
}

function reloadCertificatesOnPage() {
  window.scrollTo(0, 0);
  setPageOffset(0);
  removeElementsByClass("product-card");
  removeElementsByClass("no-items-title");
  getCertificates();
}

function removeElementsByClass(className) {
  const elements = document.querySelectorAll("." + className);

  for (let i = 0; i < elements.length; i++) {
    elements[i].parentNode.removeChild(elements[i]);
  }
}

function mapFilterToQuery(filter) {
  if (!filter) {
    return "";
  }
  return (
    getParamQuery("certName", filter.name) +
    getParamQuery("tagName", filter.tag) +
    getParamQuery("description", filter.description)
  );
}

function getParamQuery(paramName, paramValue) {
  return !paramValue || paramValue == ""
    ? ""
    : "&" + paramName + "=" + paramValue;
}

// debounce

const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

const debouncedScroll = debounce(function () {
  const certificateLength = document.querySelectorAll(".product-card").length;
  setPageOffset(certificateLength);
  getCertificates();
}, 500);

const debouncedLastScrollPosition = debounce(function () {
  window.localStorage.setItem("last-scroll-y", window.scrollY);
}, 1000);

window.onscroll = function () {
  if (this.innerHeight + this.scrollY >= document.body.scrollHeight - 200) {
    debouncedScroll();
  }
  debouncedLastScrollPosition();
};

function setPageOffset(certificateSize) {
  const page = certificateSize / 20;
  window.localStorage.setItem(
    "home-page-offset",
    page > 0 && page < 1 ? 1 : page
  );
}

function getPageOffset() {
  let pageOffset = window.localStorage.getItem("home-page-offset");

  if (!pageOffset) {
    window.localStorage.setItem("home-page-offset", 0);
    pageOffset = 0;
  }

  return pageOffset;
}

// filter logic

function addFilterHandlers() {
  document.querySelector("#name").addEventListener("change", (e) => {
    window.localStorage.setItem("filter-name", e.target.value);
  });

  document.querySelector("#tag").addEventListener("change", (e) => {
    window.localStorage.setItem("filter-tag", e.target.value);
  });

  document.querySelector("#description").addEventListener("change", (e) => {
    window.localStorage.setItem("filter-description", e.target.value);
  });

  document.querySelector(".filter-btn--reset").addEventListener("click", () => {
    window.localStorage.removeItem("filter-name");
    window.localStorage.removeItem("filter-tag");
    window.localStorage.removeItem("filter-description");
    fillFilterForm();
    reloadCertificatesOnPage();
  });

  document.querySelector(".filter-btn--apply").addEventListener("click", () => {
    reloadCertificatesOnPage();
  });
}

function fillFilterForm() {
  const filter = getFilter();

  document.querySelector("#name").value = filter.name;
  document.querySelector("#tag").value = filter.tag;
  document.querySelector("#description").value = filter.description;
}

function getFilter() {
  return {
    name: window.localStorage.getItem("filter-name") || "",
    tag: window.localStorage.getItem("filter-tag") || "",
    description: window.localStorage.getItem("filter-description") || "",
  };
}

// sort logic

function addSortHandlers(callback) {
  document
    .querySelector(".select-filter__item[aria-details='upd-asc']")
    .addEventListener("click", (e) => {
      setSorting("sortByCreateDate", "ASC");
      callback(e);
    });

  document
    .querySelector(".select-filter__item[aria-details='upd-desc']")
    .addEventListener("click", (e) => {
      setSorting("sortByCreateDate", "DESC");
      callback(e);
    });

  document
    .querySelector(".select-filter__item[aria-details='name-asc']")
    .addEventListener("click", (e) => {
      setSorting("sortByName", "ASC");
      callback(e);
    });

  document
    .querySelector(".select-filter__item[aria-details='name-desc']")
    .addEventListener("click", (e) => {
      setSorting("sortByName", "DESC");
      callback(e);
    });
}

function addSortHandlersCallback(e) {
  document.querySelectorAll(".select-filter__item").forEach((button) => {
    button.classList.remove("active-filter");
  });
  e.target.classList.add("active-filter");
  reloadCertificatesOnPage();
}

function setSorting(sortName, type) {
  if (sortName == "sortByName") {
    window.localStorage.setItem("sortByName", type);
    window.localStorage.removeItem("sortByCreateDate");
  } else if (sortName == "sortByCreateDate") {
    window.localStorage.setItem("sortByCreateDate", type);
    window.localStorage.removeItem("sortByName");
  }
}

function getSorting() {
  const sortByName = window.localStorage.getItem("sortByName");
  const sortByCreateDate = window.localStorage.getItem("sortByCreateDate");

  if (!sortByName && !sortByCreateDate) {
    return getParamQuery("sortByCreateDate", "DESC");
  } else if (sortByName) {
    return getParamQuery("sortByName", sortByName);
  } else if (sortByCreateDate) {
    return getParamQuery("sortByCreateDate", sortByCreateDate);
  }
}

// search logic

function addSearchListener() {
  const debouncedSearch = debounce(function (e) {
    window.localStorage.setItem("filter-name", e.target.value);
    fillFilterForm();
    reloadCertificatesOnPage();
  }, 500);

  document
    .querySelector(".search-catalog__input")
    .addEventListener("keyup", (e) => {
      debouncedSearch(e);
    });
}

window.addEventListener(
  "load",
  function () {
    const lastScrollY = window.localStorage.getItem("last-scroll-y");
    const lastPage = window.localStorage.getItem("home-page-offset");

    addBannerClickHandler();
    addFilterHandlers();
    addSortHandlers(addSortHandlersCallback);
    addSearchListener();
    fillFilterForm();

    if (lastScrollY && lastPage) {
      getCertificates(0, lastPage * 20).then(() =>
        window.scrollBy(0, lastScrollY)
      );
    } else {
      getCertificates();
    }
  },
  false
);
