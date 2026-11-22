import { useState } from "react";
import UserActions from "./components/UserActions";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("Student");

  console.log("App rendered - count:", count, "username:", username);

  // BASELINE (UNOPTIMIZED):
  // This function is recreated on every render with a new reference!
  // TODO FOR YOU: Wrap updateUsername in useCallback so its reference remains stable.
  const updateUsername = () => {
    setUsername((prev) => (prev === "Student" ? "Alex" : "Student"));
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Task 3: Function Reference Optimization</h2>
        <p className="subtitle">
          Observe why React.memo fails when passing non-memoized callback functions.
        </p>

        <div className="stats-box">
          <div className="stat">
            <span className="label">Parent Counter:</span>
            <span className="value">{count}</span>
          </div>
        </div>

        {/* UserActions is wrapped with React.memo, but receives updateUsername */}
        <UserActions username={username} updateUsername={updateUsername} />

        <div className="parent-actions">
          <button className="btn btn-primary" onClick={() => setCount((c) => c + 1)}>
            Increment Parent Count ({count})
          </button>
        </div>

        <div className="hint-box">
          <strong>Testing instructions:</strong>
          <ol>
            <li>Open DevTools Console (F12).</li>
            <li>Click "Increment Parent Count" - notice <code>UserActions child rendered!</code> fires even though it is wrapped in <code>React.memo</code>!</li>
            <li>Wrap <code>updateUsername</code> in <code>useCallback</code> with the appropriate dependency.</li>
            <li>Click "Increment Parent Count" again - <code>UserActions</code> should now be skipped completely!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
