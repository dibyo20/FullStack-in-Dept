import { useState } from "react";
import ProductList from "./components/ProductList";
import "./App.css";

const initialProducts = [
  { id: 1, name: "Laptop", price: 60000, category: "Electronics" },
  { id: 2, name: "Mobile", price: 20000, category: "Electronics" },
  { id: 3, name: "Shoes", price: 3000, category: "Fashion" },
  { id: 4, name: "Watch", price: 5000, category: "Fashion" },
  { id: 5, name: "Monitor", price: 15000, category: "Electronics" },
];

function App() {
  const [count, setCount] = useState(0);
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("none");

  console.log("App rendered - count:", count, "category:", category, "sortBy:", sortBy);

  // BASELINE (UNOPTIMIZED):
  // This filtering & sorting recalculates on EVERY render (e.g. when count changes).
  // TODO FOR YOU: Wrap this calculation in useMemo with dependencies [category, sortBy].
  console.log("Filtering and sorting products calculation running...");
  const filteredProducts =
    category === "All"
      ? initialProducts
      : initialProducts.filter((p) => p.category === category);

  const processedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "low-to-high") return a.price - b.price;
    if (sortBy === "high-to-low") return b.price - a.price;
    return 0;
  });

  return (
    <div className="container">
      <div className="card">
        <h2>Task 4: Product Filtering & Sorting</h2>
        <p className="subtitle">
          Optimize data transformation with useMemo and child rendering with React.memo.
        </p>

        <div className="counter-box">
          <span className="label">Unrelated Counter: <strong>{count}</strong></span>
          <button className="btn btn-primary" onClick={() => setCount((c) => c + 1)}>
            Increment Counter ({count})
          </button>
        </div>

        <div className="filters-grid">
          <div className="control-group">
            <label>Filter by Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          <div className="control-group">
            <label>Sort by Price:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="none">Default Order</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        <ProductList products={processedProducts} />

        <div className="hint-box">
          <strong>Testing instructions:</strong>
          <ol>
            <li>Open DevTools Console (F12).</li>
            <li>Click "Increment Counter" 5 times - notice both the calculation and <code>ProductList</code> run every time!</li>
            <li>Wrap the filtering and sorting logic in <code>useMemo</code>.</li>
            <li>Wrap <code>ProductList</code> in <code>React.memo</code>.</li>
            <li>Click "Increment Counter" again - neither the calculation nor <code>ProductList</code> should re-run!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
