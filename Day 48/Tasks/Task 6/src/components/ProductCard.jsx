import React from "react";

const ProductCard = React.memo(({ product, inWishlist, inCart, onAddToCart, onRemoveFromCart, onToggleWishlist }) => {
  console.log(`ProductCard rendered for id: ${product.id}`);

  return (
    <div className="product-card">
      <div className="product-card__header">
        <span className="product-card__cat">{product.category}</span>
        <span className="product-card__rating">★ {product.rating}</span>
      </div>

      <h4 className="product-card__name">{product.name}</h4>
      <div className="product-card__price">Rs. {product.price.toLocaleString()}</div>
      <div className="product-card__stock">Stock: {product.stock}</div>

      <div className="product-card__actions">
        {inCart ? (
          <button
            className="btn-action btn-remove"
            onClick={() => onRemoveFromCart(product.id)}
          >
            Remove Cart
          </button>
        ) : (
          <button
            className="btn-action btn-cart"
            onClick={() => onAddToCart(product.id)}
          >
            Add to Cart
          </button>
        )}

        <button
          className={`btn-action btn-wishlist ${inWishlist ? "active" : ""}`}
          onClick={() => onToggleWishlist(product.id)}
        >
          {inWishlist ? "Wishlisted" : "Wishlist"}
        </button>
      </div>
    </div>
  );
});

export default ProductCard;
