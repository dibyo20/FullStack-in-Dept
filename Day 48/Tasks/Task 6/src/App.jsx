import { useState, useMemo, useCallback } from "react";
import ProductGrid from "./components/ProductGrid";
import CartSummary from "./components/CartSummary";
import "./App.css";

const categoriesList = ["Electronics", "Fashion", "Home", "Books", "Sports"];
const initialProducts = Array.from({ length: 2000 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    name: `Product ${id}`,
    price: ((id * 37) % 49500) + 500,
    category: categoriesList[id % categoriesList.length],
    rating: Number(((id % 40) / 10 + 1).toFixed(1)),
    stock: (id % 15) + 1,
  };
});

function App() {
  const [products] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sortBy, setSortBy] = useState("none");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [unrelatedCount, setUnrelatedCount] = useState(0);

  console.log("App rendered - Unrelated Count:", unrelatedCount);

  const filteredProducts = useMemo(() => {
    console.log("Filtering and sorting 2,000 products calculation running...");
    return products
      .filter((product) => {
        const matchName = product.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchCat = category === "All" || product.category === category;
        const matchPrice = product.price <= maxPrice;
        return matchName && matchCat && matchPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [products, search, category, maxPrice, sortBy]);

  const totalPrice = useMemo(() => {
    console.log("Calculating cart summary...");
    const cartProductList = products.filter((p) => cart.includes(p.id));
    return cartProductList.reduce((acc, curr) => acc + curr.price, 0);
  }, [cart, products]);

  const cartSet = useMemo(() => new Set(cart), [cart]);
  const wishlistSet = useMemo(() => new Set(wishlist), [wishlist]);

  const handleAddToCart = useCallback((id) => {
    setCart((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const handleRemoveFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item !== id));
  }, []);

  const handleToggleWishlist = useCallback((id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>Task 6: E-Commerce Product Listing (2,000 Products)</h2>
        <p className="subtitle">
          Performance challenge combining useMemo, React.memo, and useCallback.
        </p>

        {/* Unrelated Counter */}
        <div className="counter-box">
          <span>Unrelated Counter: <strong>{unrelatedCount}</strong></span>
          <button
            className="btn btn-primary"
            onClick={() => setUnrelatedCount((c) => c + 1)}
          >
            Increment Counter ({unrelatedCount})
          </button>
        </div>

        {/* Cart & Wishlist Summary */}
        <CartSummary
          cartCount={cart.length}
          totalPrice={totalPrice}
          wishlistCount={wishlist.length}
        />

        {/* Controls: Search, Category, Price Range, Sort */}
        <div className="controls-grid">
          <div className="control-group">
            <label>Search Product:</label>
            <input
              type="text"
              placeholder="Search product name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label>Max Price (Rs. {maxPrice.toLocaleString()}):</label>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="none">Default Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          cartSet={cartSet}
          wishlistSet={wishlistSet}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onToggleWishlist={handleToggleWishlist}
        />
      </div>
    </div>
  );
}

export default App;
