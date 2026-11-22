import { useState } from "react";
import "./App.css";

// Expensive function simulating heavy CPU-intensive work (approx. 50 million iterations)
const calculateExpensiveValue = (num) => {
  console.log("Expensive calculation running for number:", num);
  let total = 0;
  for (let i = 0; i < 50000000; i++) {
    total += num;
  }
  return total;
};

function App() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(1);

  // BASELINE (UNOPTIMIZED):
  // This runs on EVERY render, even when only 'count' changes!
  // TODO FOR YOU: Optimize this calculation using useMemo so it only runs when 'number' changes.
  const calculatedResult = calculateExpensiveValue(number);

  console.log("App component rendered. Current count:", count);

  return (
    <div className="container">
      <div className="card">
        <h2>Task 1: Expensive Calculation</h2>
        <p className="subtitle">
          Observe how incrementing count triggers the 50 million iteration loop!
        </p>

        <div className="stats-box">
          <div className="stat">
            <span className="label">Current Number:</span>
            <span className="value">{number}</span>
          </div>
          <div className="stat">
            <span className="label">Calculation Result:</span>
            <span className="value result">{calculatedResult.toLocaleString()}</span>
          </div>
          <div className="stat">
            <span className="label">Independent Count:</span>
            <span className="value">{count}</span>
          </div>
        </div>

        <div className="actions">
          <button className="btn btn-primary" onClick={() => setCount((c) => c + 1)}>
            Increment Count ({count})
          </button>
          <button className="btn btn-secondary" onClick={() => setNumber((n) => n + 1)}>
            Change Number ({number})
          </button>
        </div>

        <div className="hint-box">
          <strong>Testing instructions:</strong>
          <ol>
            <li>Open DevTools Console (F12).</li>
            <li>Click "Increment Count" 5 times - notice the console logs and UI delay.</li>
            <li>Apply <code>useMemo</code> to cache <code>calculatedResult</code>.</li>
            <li>Click "Increment Count" again - the calculation should NOT repeat!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
