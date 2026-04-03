import React, { useState } from "react";

const App = () => {
  const [marks, setMarks] = useState([45, 30, 20, 10, 15]);

  function graceMarks() {
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
          <h1>
            Marks of Student {idx + 1} = {elem} ({elem > 30 ? "Pass" : "Fail"})
          </h1>
        );
      })}
      <button onClick={graceMarks}>Give Grace</button>
    </div>
  );
};

export default App;
