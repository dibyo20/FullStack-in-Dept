import React, { useState } from "react";
import axios from "axios";
import Card from "./components/Card.jsx";

const App = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products/");
    setData(data);
    console.log(data);
  };
  return (
    <>
      <button onClick={getData} className="btn">
        Get Data
      </button>
      <div className="card-div">
        {data.map(function (elem, idx) {
          return <Card key={idx} data={elem} />;
        })}
      </div>
    </>
  );
};

export default App;
