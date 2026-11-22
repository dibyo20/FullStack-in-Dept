import { useState } from "react";
import UserProfile from "./components/UserProfile";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("Alex Johnson");

  console.log("App rendered", count, "username:", username);

  const toggleUsername = () => {
    setUsername((prev) => (prev === "Alex Johnson" ? "Sam Taylor" : "Alex Johnson"));
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Task 2: Prevent Unnecessary Child Renders</h2>

        <div className="stats-box">
          <div className="stat">
            <span className="label">Parent Counter:</span>
            <span className="value">{count}</span>
          </div>
        </div>

        <UserProfile username={username} />

        <div className="actions">
          <button className="btn btn-primary" onClick={() => setCount((c) => c + 1)}>
            Increment Count ({count})
          </button>
          <button className="btn btn-secondary" onClick={toggleUsername}>
            Update Username
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
