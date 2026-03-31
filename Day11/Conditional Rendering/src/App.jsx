import React from "react";
import Men from "./components/Men";
import Women from "./components/Women";

const App = () => {
  const user1 = {
    name: "Srijan",
    age: 22,
    gender: "female",
  };

  const user2 = {
    name: "Dibyo",
    age: 22,
    gender: "male",
  };

  const user3 = {
    name: "Ramiz",
    age: 19,
    gender: "male",
  };
  return <>{user1.gender == "male" ? <Men /> : <Women />}</>;
};

export default App;
