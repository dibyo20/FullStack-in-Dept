import React, { useContext } from "react";
import "../styles/Products.scss";
import { ProductDataContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

const Products = () => {
  const productData = useContext(ProductDataContext);

  let renderData = <p className="products__loading">Loading products...</p>;

  if (productData.length > 0) {
    renderData = productData.map((product, idx) => {
      return (
        <div key={idx} className="product-card">
          <div className="product-card__image">
            <img src={product.image} alt={product.title} />
          </div>

          <h2 className="product-card__title">{product.title}</h2>

          <p className="product-card__price">${product.price}</p>

          <p className="product-card__category">{product.category}</p>

          <Link to={`/products/${product.id}`} className="product-card__btn">
            View Details
          </Link>
        </div>
      );
    });
  }

  return <div className="products">{renderData}</div>;
};

export default Products;
