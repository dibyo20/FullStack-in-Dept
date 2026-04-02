import React, { useState } from "react";

const App = () => {
  const [marks, setMarks] = useState([45, 30, 20, 15, 10]);

  function setGrace() {
    const newMarks = marks.map(function (elem) {
      if (elem >= 65) {
        return elem;
      } else {
        return elem + 5;
      }
    });
    setMarks(newMarks);
  }

  return (
    <div>
      {marks.map(function (elem, idx) {
        return (
          <h1 key={idx}>
            Marks of the Student {idx + 1} = {elem} (
            {elem > 24 ? "Pass" : "Fail"})
          </h1>
        );
      })}
      <button onClick={setGrace}>Give grace</button>
    </div>
  );
};

export default App;
