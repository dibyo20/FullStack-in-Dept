function Product() {
  const products = [
    { id: 1, name: "Product One", price: 1299, category: "Technology" },
    { id: 2, name: "Product Two", price: 2499, category: "Accessories" },
    { id: 3, name: "Product Three", price: 999, category: "Electronics" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#111827] border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition"
          >
            <div className="h-40 bg-[#1e293b] rounded-xl flex items-center justify-center text-indigo-400 text-4xl mb-6">
              ◈
            </div>

            <span className="text-xs text-indigo-400">
              {product.category}
            </span>

            <h2 className="text-xl font-semibold mt-2">
              {product.name}
            </h2>

            <div className="flex justify-between items-center mt-6">
              <span className="text-xl font-bold">
                ₹{product.price}
              </span>

              <button className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-sm transition">
                View Product
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Product;