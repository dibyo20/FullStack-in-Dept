import React from "react";
import { useState } from "react";

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <input
        type={isVisible ? "text" : "password"}
        placeholder="Enter your password"
      />
      <button
        onClick={() => {
          setIsVisible((prev) => !prev);
        }}
      >
        {isVisible ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default App;
