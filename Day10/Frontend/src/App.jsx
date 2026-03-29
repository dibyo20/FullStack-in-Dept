import React from "react";
import Card from "./components/Card.jsx";

const App = () => {
  let users = ["Apple", "Mango", "Banana", "Pomegrante", "Orange"];
  return (
    <div className="app">
      {users.map(function (elem) {
        return <Card users={elem} />;
      })}
    </div>
  );
};

export default App;
