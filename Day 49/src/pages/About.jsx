function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      <div className="max-w-3xl">
        <span className="text-indigo-400 font-semibold text-sm">
          ABOUT US
        </span>

        <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
          We Build Digital Experiences.
        </h1>

        <p className="text-slate-400 text-lg leading-relaxed">
          Our platform focuses on providing a modern, efficient
          and user-friendly experience using the latest frontend
          technologies.
        </p>

        <div className="grid grid-cols-2 gap-5 mt-12">

          <div className="bg-[#111827] border border-slate-800 rounded-xl p-6">
            <h2 className="text-3xl font-bold text-indigo-400">100%</h2>
            <p className="text-slate-400 mt-2">Responsive Design</p>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-xl p-6">
            <h2 className="text-3xl font-bold text-indigo-400">React</h2>
            <p className="text-slate-400 mt-2">Modern Technology</p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default About;