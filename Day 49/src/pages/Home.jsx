function Home() {
  const features = [
    {
      title: "Modern Design",
      description: "Beautiful and responsive user interfaces.",
      icon: "✦",
    },
    {
      title: "Fast Performance",
      description: "Optimized React application architecture.",
      icon: "⚡",
    },
    {
      title: "Easy Navigation",
      description: "Seamless navigation using React Router.",
      icon: "⌘",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      {/* Hero Section */}
      <section className="text-center py-16">

        <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm mb-6">
          Welcome to our platform
        </span>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Build Something
          <span className="block text-indigo-400">
            Amazing Today.
          </span>
        </h1>

        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Explore our modern platform built using React, React Router
          and Tailwind CSS. Experience simplicity and performance
          in one place.
        </p>

        <div className="flex justify-center gap-4 mt-9">
          <button className="bg-indigo-500 hover:bg-indigo-600 px-7 py-3 rounded-lg font-semibold transition">
            Explore Now
          </button>

          <button className="border border-slate-700 hover:border-indigo-400 px-7 py-3 rounded-lg font-semibold transition">
            Learn More
          </button>
        </div>

      </section>

      {/* Features */}
      <section className="mt-20">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            What We Offer
          </h2>

          <p className="text-slate-400">
            Everything you need in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#111827] border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-8 transition duration-300"
            >
              <div className="text-3xl mb-5 text-indigo-400">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Home;