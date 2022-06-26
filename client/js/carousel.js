let slideBullets = [];
let curSlide = 0;

const changeSlide = function (bullet) {
  const list = document.querySelector(".promo__list");

  slideBullets.forEach((bullet) => {
    bullet.classList.remove("promo__pagination-bullet--active");
  });
  bullet.classList.add("promo__pagination-bullet--active");

  list.style.transform = `translateX(${-100 * curSlide}%)`;
};

const slideFunc = function () {
  curSlide == 1 ? curSlide-- : curSlide++;
  const bullet = document.querySelector(
    `.promo__pagination .promo__pagination-bullet:nth-child(${curSlide + 1})`
  );

  changeSlide(bullet);
};

window.addEventListener(
  "load",
  () => {
    slideBullets = document.querySelectorAll(".promo__pagination-bullet");

    slideBullets.forEach((bullet, index) => {
      bullet.addEventListener("click", function () {
        bullet.getAttribute("slide-number");
        changeSlide(bullet);
      });
    });

    window.setInterval(function () {
      slideFunc();
    }, 5000);
  },
  false
);
