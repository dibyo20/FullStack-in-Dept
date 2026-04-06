import React, { useState } from "react";

const App = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <div>
      <h1 id="h">Hello I am a Software Developer !</h1>
      <button
        id="btn"
        onClick={() => {
          const newState = !isDark;
          setIsDark(newState);

          document.body.style.backgroundColor = newState ? "black" : "white";
          document.body.style.color = newState ? "white" : "black";

          const btn = document.getElementById("btn");
          btn.style.backgroundColor = newState ? "white" : "black";
          btn.style.color = newState ? "black" : "white";

          const h = document.getElementById("h");
          h.innerHTML = newState
            ? "Hello I am a Software Developer !"
            : "My Name is Dibyo Banerjee";
        }}
      >
        Change Theme
      </button>
    </div>
  );
};

export default App;
