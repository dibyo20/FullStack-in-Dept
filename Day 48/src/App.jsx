import React, { useCallback, useState } from "react";
import About from "./components/About.jsx";

const App = () => {
  const [count, setCount] = useState(0);
  const [calc, setCalc] = useState(0);

  const heavycalc = React.useMemo(() => {
    console.log("Running heavy loop...");
    let i = 0;
    while (i < 200000000) i++;
    return calc + 1;
  }, [calc]);

  console.log("App Rendered");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white ">
      <h3>calc - {calc}</h3>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => setCalc(heavycalc)}
      >
        Heavy Calc (Runs Loop)
      </button>

      <h3>count - {count}</h3>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() =>
          setCount((c) => {
            let i = 0;
            while (i < 200000000000000) i++;
            return c + 1 + i;
          })
        }
      >
        Other State (Skips Loop)
      </button>

      <About heavycalc={heavycalc} />
    </div>
  );
};

export default App;
