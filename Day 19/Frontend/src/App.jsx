import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar.jsx";
import Sections from "./components/Sections.jsx";

const App = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get("http://localhost:2019/data");
    setData(res.data);
  };
  return (
    <>
      <h1>App Component</h1>
      <Sections data={data} />
      <button onClick={getData}>Get Data</button>
    </>
  );
};

export default App;
