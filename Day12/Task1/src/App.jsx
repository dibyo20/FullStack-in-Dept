import React, { useState } from "react";

const App = () => {
  const [grace, setGrace] = useState(0)
  let marks = [45, 30, 20, 15, 10];

  function increase(){
    setGrace(grace+5);
  }
  console.log(grace);

  return (
    <>
      {marks.map(function (elem, idx) {
        return (
          <h1>
            Marks of the Student {idx + 1} = {elem + grace}
          </h1>
        );
      })}
      <button onClick={increase}>Grace +5</button>
    </>
  );
};

export default App;
