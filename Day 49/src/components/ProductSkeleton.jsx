
function ProductSkeleton() {
  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 animate-pulse">

      {/* Image Skeleton */}
      <div className="h-40 bg-[#1e293b] rounded-xl mb-6" />

      {/* Category Skeleton */}
      <div className="h-3 w-20 bg-slate-700 rounded mb-4" />

      {/* Product Title Skeleton */}
      <div className="h-5 w-36 bg-slate-700 rounded mb-6" />

      {/* Price & Button Skeleton */}
      <div className="flex justify-between items-center mt-6">

        <div className="h-5 w-16 bg-slate-700 rounded" />

        <div className="h-9 w-28 bg-indigo-500/40 rounded-lg" />

      </div>

    </div>
  );
}

export default ProductSkeleton;