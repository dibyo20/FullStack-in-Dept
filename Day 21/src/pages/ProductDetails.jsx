import React, { useContext } from "react";
import "../styles/ProductDetails.scss";
import { ProductDataContext } from "../context/ProductContext";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const productData = useContext(ProductDataContext);

  const { id } = useParams();
  let selectedProduct = "";

  if (productData.length > 0) {
    selectedProduct = productData.find(
      (product) => product.id === parseInt(id),
    );
  }

  return (
    <>
      {selectedProduct ? (
        <div className="product-details">
          <div className="product-details__container">
            {/* Image Section */}
            <div className="product-details__image">
              <img src={selectedProduct.image} alt={selectedProduct.title} />
            </div>

            {/* Details Section */}
            <div className="product-details__content">
              <h1 className="product-details__title">
                {selectedProduct.title}
              </h1>

              <p className="product-details__category">
                {selectedProduct.category}
              </p>

              <p className="product-details__description">
                {selectedProduct.description}
              </p>

              <p className="product-details__price">${selectedProduct.price}</p>

              <div className="product-details__actions">
                <button className="btn-primary">Add to Cart</button>

                <button className="btn-outline">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="product-details__notfound">Product not found.</p>
      )}
    </>
  );
};

export default ProductDetails;
