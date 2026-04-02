import React from "react";
import { useState } from "react";

const App = () => {
  const users = ["John", "Doe", "Smith", "Jane", "Sumit", "Srijan"];
  const [user, setUser] = useState(0);
  return (
    <div>
      <h1>{users[user]}</h1>
      <button
        onClick={() => {
          if (user < users.length-1) {
            setUser(user + 1);
          }
        }}
      >
        Change User
      </button>
    </div>
  );
};

export default App;
