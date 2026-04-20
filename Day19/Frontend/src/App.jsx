import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import axios from "axios";
import Sections from "./components/Sections.jsx";

const App = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get("http://localhost:2019/data");
    setData(res.data);
  };
  return (
    <>
      <Navbar />
      <h1>Section</h1>
      <Sections data={data} />
      <button onClick={getData}>Get Data</button>
    </>
  );
};

export default App;
