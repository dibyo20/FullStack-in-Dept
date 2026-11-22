import React from "react";

const CartSummary = React.memo(({ cartCount, totalPrice, wishlistCount }) => {
  console.log("CartSummary rendered");

  return (
    <div className="cart-summary">
      <div className="summary-item">
        <span className="summary-label">Cart Items:</span>
        <span className="summary-value">{cartCount}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Total Price:</span>
        <span className="summary-value highlight">Rs. {totalPrice.toLocaleString()}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Wishlist Items:</span>
        <span className="summary-value">{wishlistCount}</span>
      </div>
    </div>
  );
});

export default CartSummary;
