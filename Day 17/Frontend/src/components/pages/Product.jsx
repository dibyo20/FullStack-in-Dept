import React from "react";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <div>
      <div className="component">Product</div>
      <Link to="/product/men" className="component">Men</Link>
      <Link to="/product/women" className="component">Women</Link>
    </div>
  );
};

export default Product;
