import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b1120] text-slate-100">

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-[#111827] border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <p className="text-sm text-slate-400">
            © 2026 MyWebsite. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Built with React & Tailwind CSS
          </p>
        </div>
      </footer>

    </div>
  );
}

export default MainLayout;