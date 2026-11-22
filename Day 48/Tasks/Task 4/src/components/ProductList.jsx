import React from "react";

// BASELINE (UNOPTIMIZED):
// This component is NOT memoized.
// TODO FOR YOU: Wrap ProductList with React.memo so it only re-renders when the products prop changes!
const ProductList = ({ products }) => {
  console.log("ProductList rendered! Number of products:", products.length);

  return (
    <div className="product-list">
      <div className="product-list__header">
        <span>Product ({products.length})</span>
        <span>Price</span>
      </div>
      <ul className="product-list__items">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <div>
              <span className="product-name">{product.name}</span>
              <span className="product-tag">{product.category}</span>
            </div>
            <span className="product-price">Rs. {product.price.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
