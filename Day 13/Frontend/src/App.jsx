import React, { useState } from "react";
import Card from "./components/Card.jsx";

const App = () => {
  const [name, setName] = useState("");
  const [allNames, setAllNames] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newNames = [...allNames, name];
    setAllNames(newNames);
    setName("");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
      {allNames.map(function (elem, idx) {
        return <Card key={idx} name={elem} />;
      })}
    </div>
  );
};

export default App;
