import { useState } from "react";
import About from "./components/About.jsx";

const App = () => {
  const [count, setCount] = useState(0);

  const [user, setUser] = useState({
    name: "sneha",
    age: 20,
  });

  const changeUser = () => {
    setUser({
      name: "srijan",
      age: 22,
    });
  };

  const changeAge = () => {
    setUser((prev) => ({
      ...prev,
      age: prev.age + 1,
    }));
  };

  console.log("App Rendered");

  return (
    <>
      <h2>Counter: {count}</h2>
      <button
        className="bg-blue-500 p-1 m-1 rounded"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>

      <hr />

      <About user={user} />

      <button onClick={changeUser} className="bg-blue-500 p-1 rounded">
        Change User
      </button>

      <button onClick={changeAge} className="bg-blue-500 p-1 m-1 rounded">
        Change Age
      </button>
    </>
  );
};

export default App;
