import React from "react";
import { Link } from "react-router-dom";

import "./product-list.css";

const ProductList = (props) => {
  const certificates =
    props.certificates &&
    props.certificates.map((certificate) => (
      <div key={certificate.id} className="product-card">
        <Link to={"/certificates/" + certificate.id}>
          <img src={certificate.imageUrl} alt="certificate" />
          <div className="product-card__body">
            <p className="product-card__name">{certificate.name}</p>
            <p className="product-card__description">
              {certificate.description}
            </p>
          </div>
        </Link>
        <div className="product-card__bottom">
          <p className="product-card__price">{certificate.price} $</p>
          <button className="btn-main-sm">To cart</button>
        </div>
      </div>
    ));

  return <>{certificates}</>;
};

export default ProductList;
