import { useState, useMemo } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);

  const calculateExpensiveValue = (num) => {
    console.log("Running heavy loop...");
    let i = 0;
    while (i < 50000000) i++;
    return num * 10;
  };

  const calculatedResult = calculateExpensiveValue(number);

  console.log("App component rendered.");

  return (
    <div className="container">
      <div className="card">
        <h2>Task 1: Expensive Calculation</h2>

        <div className="stats-box">
          <div className="stat">
            <span className="label">Current Number:</span>
            <span className="value">{number}</span>
          </div>
          <div className="stat">
            <span className="label">Calculation Result:</span>
            <span className="value result">{calculatedResult}</span>
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
      </div>
    </div>
  );
}

export default App;
