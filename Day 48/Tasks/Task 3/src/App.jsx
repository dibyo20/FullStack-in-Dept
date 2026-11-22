import { useState, useCallback } from "react";
import UserActions from "./components/UserActions";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("Student");

  console.log("App rendered - count:", count, "username:", username);

  const updateUsername = useCallback(() => {
    setUsername((prev) => (prev === "Student" ? "Alex" : "Student"));
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>Task 3: Function Reference Optimization</h2>

        <div className="stats-box">
          <div className="stat">
            <span className="label">Parent Counter:</span>
            <span className="value">{count}</span>
          </div>
        </div>

        <UserActions username={username} updateUsername={updateUsername} />

        <div className="parent-actions">
          <button className="btn btn-primary" onClick={() => setCount((c) => c + 1)}>
            Increment Parent Count ({count})
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
