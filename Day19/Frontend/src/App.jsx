import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  const [theme, setTheme] = useState("");

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <>
      <h1>The Theme is {theme}</h1>
      <Navbar changeTheme={changeTheme} />
    </>
  );
};

export default App;
