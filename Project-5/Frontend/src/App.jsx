import React, { useState } from "react";
import PlayerArena from "./pages/PlayerArena";
import AdminDashboard from "./pages/AdminDashboard";
import "./styles/App.scss";

function App() {
  const [view, setView] = useState("player");

  return (
    <div className="app">
      <nav className="app__nav">
        <button
          className={`app__nav-btn ${view === "player" ? "active" : ""}`}
          onClick={() => setView("player")}
        >
          Player View
        </button>
        <button
          className={`app__nav-btn ${view === "admin" ? "active" : ""}`}
          onClick={() => setView("admin")}
        >
          Admin View
        </button>
      </nav>

      <main className="app__content">
        {view === "player" ? <PlayerArena /> : <AdminDashboard />}
      </main>
    </div>
  );
}

export default App;
