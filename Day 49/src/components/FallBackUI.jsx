function FallbackUI({ error, onRetry }) {
  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center px-6">

      <div className="max-w-md w-full bg-[#111827] border border-slate-800 rounded-2xl p-8 text-center">

        {/* Error Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
          <span className="text-3xl text-red-400">⚠</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-white mb-3">
          Oops! Something Went Wrong
        </h1>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-7">
          An unexpected error occurred while displaying this page.
          Please try again.
        </p>

        {/* Retry Button */}
        <button
          onClick={onRetry}
          className="w-full bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-semibold py-3 rounded-lg transition"
        >
          Try Again
        </button>

        {/* Development Error Details */}
        {import.meta.env.DEV && error && (
          <details className="mt-6 text-left">
            <summary className="text-sm text-red-400 cursor-pointer">
              Show Error Details
            </summary>

            <pre className="mt-3 p-4 bg-[#0b1120] border border-slate-800 rounded-lg text-xs text-red-300 whitespace-pre-wrap break-words overflow-auto max-h-48">
              {error.toString()}
            </pre>
          </details>
        )}

      </div>
    </div>
  );
}

export default FallbackUI;