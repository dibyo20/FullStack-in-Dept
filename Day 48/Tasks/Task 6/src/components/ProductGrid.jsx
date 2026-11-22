import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = React.memo(({
  products,
  cartSet,
  wishlistSet,
  onAddToCart,
  onRemoveFromCart,
  onToggleWishlist,
}) => {
  console.log(`ProductGrid rendered (${products.length} products)`);

  return (
    <div className="product-grid-wrapper">
      <div className="product-grid">
        {products.slice(0, 40).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            inCart={cartSet.has(product.id)}
            inWishlist={wishlistSet.has(product.id)}
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
      {products.length > 40 && (
        <p className="grid-note">
          Displaying first 40 of {products.length} matching products for DOM rendering performance.
        </p>
      )}
    </div>
  );
});

export default ProductGrid;
