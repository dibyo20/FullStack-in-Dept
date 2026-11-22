import { useState } from "react";
import UserProfile from "./components/UserProfile";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("Alex Johnson");

  console.log("App rendered - count:", count, "username:", username);

  const toggleUsername = () => {
    setUsername((prev) => (prev === "Alex Johnson" ? "Sam Taylor" : "Alex Johnson"));
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Task 2: Prevent Unnecessary Child Renders</h2>
        <p className="subtitle">
          Test how child components re-render when parent state updates.
        </p>

        <div className="stats-box">
          <div className="stat">
            <span className="label">Parent Counter:</span>
            <span className="value">{count}</span>
          </div>
        </div>

        {/* UserProfile only depends on 'username', not 'count' */}
        <UserProfile username={username} />

        <div className="actions">
          <button className="btn btn-primary" onClick={() => setCount((c) => c + 1)}>
            Increment Count ({count})
          </button>
          <button className="btn btn-secondary" onClick={toggleUsername}>
            Update Username
          </button>
        </div>

        <div className="hint-box">
          <strong>Testing instructions:</strong>
          <ol>
            <li>Open DevTools Console (F12).</li>
            <li>Click "Increment Count" 5 times - notice <code>UserProfile rendered</code> logs every time!</li>
            <li>Go to <code>src/components/UserProfile.jsx</code> and wrap it with <code>React.memo</code>.</li>
            <li>Click "Increment Count" again - <code>UserProfile</code> should NOT re-render!</li>
            <li>Click "Update Username" - <code>UserProfile</code> should re-render because props changed.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
