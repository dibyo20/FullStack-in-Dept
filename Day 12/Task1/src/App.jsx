import React from "react";
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  function inc() {
    setCount(count + 1);
  }

  function dec() {
    setCount(count - 1);
  }
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={inc}>Increase</button>
      <button onClick={dec}>Decrease</button>
    </div>
  );
};

export default App;
