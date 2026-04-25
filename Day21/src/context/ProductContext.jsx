import React, { createContext, useState, useEffect } from "react";
import { fetchProducts } from "../api/productApi";

export const ProductDataContext = createContext();

const ProductContext = ({ children }) => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      setProductsData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <ProductDataContext.Provider value={productsData}>
        {children}
      </ProductDataContext.Provider>
    </>
  );
};

export default ProductContext;
